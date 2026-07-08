/**
 * Real, executable smoke check for the plugin runtime — not just typechecked.
 * Run via `npm run plugins:smoke` (compiles this to ESM in a throwaway
 * `dist-smoke/` and runs it under Node; see scripts/plugins-smoke.mjs). No
 * test framework dependency: plain assertions, since this only needs to
 * catch "the runtime is broken," not provide a full test-authoring UX.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { PluginRegistry, satisfiesRange, compareVersions } from "../registry.js";
import { discoverPlugins } from "../discover.js";
import { mapFigmaComponentsToResults } from "../../providers/figma-design-inspiration-provider.js";
import type { Plugin } from "../types.js";
import type { DesignInspirationResult } from "../../providers/design-inspiration-provider.js";
import type { AssetMetadata } from "../../providers/asset-provider.js";

import mockPlugin from "./mock-inspiration.plugin.js";
import catalogPlugin from "./local-catalog.plugin.js";
import aggregatorPlugin from "./aggregator.plugin.js";
import splinePlugin from "./spline-assets.plugin.js";
import figmaPlugin from "./figma-inspiration.plugin.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(currentDir, "fixtures");
let failures = 0;

function assert(condition: unknown, message: string): void {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${message}`);
  } else {
    console.log(`ok: ${message}`);
  }
}

async function main(): Promise<void> {
  // --- satisfiesRange / compareVersions -----------------------------------
  assert(satisfiesRange("1.2.3", "^1.0.0"), 'satisfiesRange("1.2.3", "^1.0.0") is true');
  assert(
    !satisfiesRange("2.0.0", "^1.0.0"),
    'satisfiesRange("2.0.0", "^1.0.0") is false',
  );
  assert(
    satisfiesRange("0.2.3", "^0.2.0"),
    'satisfiesRange("0.2.3", "^0.2.0") is true (major=0 caret)',
  );
  assert(
    !satisfiesRange("0.3.0", "^0.2.0"),
    'satisfiesRange("0.3.0", "^0.2.0") is false (major=0 caret)',
  );
  assert(satisfiesRange("1.2.5", "~1.2.0"), 'satisfiesRange("1.2.5", "~1.2.0") is true');
  assert(
    !satisfiesRange("1.3.0", "~1.2.0"),
    'satisfiesRange("1.3.0", "~1.2.0") is false',
  );
  assert(satisfiesRange("1.0.0", "*"), 'satisfiesRange("1.0.0", "*") is true');
  assert(
    compareVersions("1.2.3", "1.2.3") === 0,
    "compareVersions treats equal versions as equal",
  );

  // --- registry: register / enable / capability lookup / disable ---------
  const registry = new PluginRegistry();
  registry.register(mockPlugin);
  registry.register(catalogPlugin);
  registry.register(aggregatorPlugin);
  registry.register(splinePlugin);
  registry.register(figmaPlugin);

  await registry.enable("example-mock-inspiration");
  const mockResults = (await registry
    .get("example-mock-inspiration")
    ?.execute({ category: "hero" })) as DesignInspirationResult[];
  assert(mockResults.length === 2, "mock plugin returns its 2 fixture results");

  await registry.enable("example-21st-dev", {
    catalogPath: path.join(fixturesDir, "21st-dev.catalog.json"),
  });
  const catalogResults = (await registry
    .get("example-21st-dev")
    ?.execute({ category: "hero" })) as DesignInspirationResult[];
  assert(
    catalogResults.length === 1,
    "21st.dev example plugin finds the 1 hero fixture entry",
  );

  // Dependencies were already enabled above, so this only configures the
  // aggregator itself — see plugins/README.md for why enable order matters.
  await registry.enable("example-aggregator");
  const aggregated = (await registry
    .get("example-aggregator")
    ?.execute({ category: "hero" })) as DesignInspirationResult[];
  assert(
    aggregated.length === mockResults.length + catalogResults.length,
    "aggregator combines both dependencies' results",
  );

  await registry.enable("example-spline-assets", {
    directory: path.join(fixturesDir, "spline"),
  });
  const splineResults = (await registry
    .get("example-spline-assets")
    ?.execute({})) as AssetMetadata[];
  assert(
    Array.isArray(splineResults) && splineResults.length === 1,
    "spline provider finds the 1 fixture .splinecode file",
  );

  // Figma: verify config validation fails loudly without credentials.
  // execute() is never called — that would need a live token and file.
  let figmaConfigRejected = false;
  try {
    await registry.enable("example-figma-inspiration", {});
  } catch {
    figmaConfigRejected = true;
  }
  assert(
    figmaConfigRejected,
    "figma plugin rejects enable() with missing required config",
  );

  // --- dependency-cycle detection -----------------------------------------
  const cyclicA: Plugin = {
    metadata: {
      id: "cyclic-a",
      name: "Cyclic A",
      version: "1.0.0",
      description: "test fixture",
      capabilities: [],
      dependencies: ["cyclic-b"],
      compatibleWith: "^1.0.0",
    },
    configSchema: [],
    initialize() {},
    configure() {},
    execute() {},
    dispose() {},
  };
  const cyclicB: Plugin = {
    ...cyclicA,
    metadata: { ...cyclicA.metadata, id: "cyclic-b", dependencies: ["cyclic-a"] },
  };
  const cyclicRegistry = new PluginRegistry();
  cyclicRegistry.register(cyclicA);
  cyclicRegistry.register(cyclicB);
  let cycleDetected = false;
  try {
    await cyclicRegistry.enable("cyclic-a");
  } catch {
    cycleDetected = true;
  }
  assert(cycleDetected, "circular plugin dependency is detected and rejected");

  // --- disable ordering ----------------------------------------------------
  let disallowedDisable = false;
  try {
    await registry.disable("example-mock-inspiration");
  } catch {
    disallowedDisable = true;
  }
  assert(
    disallowedDisable,
    "cannot disable a plugin still required by an enabled dependent",
  );

  await registry.disable("example-aggregator");
  await registry.disable("example-mock-inspiration");
  assert(true, "disabling in dependency-safe order succeeds");

  // --- discoverPlugins: real filesystem auto-discovery --------------------
  const discoveryRegistry = new PluginRegistry();
  const discoveredIds = await discoverPlugins(
    discoveryRegistry,
    path.join(fixturesDir, "discoverable"),
  );
  assert(
    discoveredIds.includes("example-discovered-hello"),
    "discoverPlugins finds and registers the hand-authored .mjs fixture",
  );
  await discoveryRegistry.enable("example-discovered-hello");
  const discoveredResult = await discoveryRegistry
    .get("example-discovered-hello")
    ?.execute(undefined);
  assert(
    discoveredResult === "hello from a discovered plugin",
    "discovered plugin executes correctly",
  );

  // --- mapFigmaComponentsToResults: pure function against a fixture -------
  const figmaFixtureResponse = {
    meta: {
      components: [
        {
          node_id: "1:23",
          name: "Primary Button",
          description: "The main CTA button component.",
        },
        { node_id: "1:24", name: "Card", description: "" },
      ],
    },
  };
  const mapped = mapFigmaComponentsToResults(figmaFixtureResponse, "abc123");
  assert(mapped.length === 2, "mapFigmaComponentsToResults maps both fixture components");
  assert(
    mapped[0].id === "figma:abc123:1:23",
    "mapped id includes the file key and node id",
  );
  assert(
    mapped[1].notes === "No description set on this component in Figma.",
    "empty description falls back to an explanatory note, not a blank string",
  );

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll plugin runtime smoke checks passed.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
