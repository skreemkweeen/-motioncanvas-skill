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
import componentRegistryPlugin, {
  provider as componentRegistryProvider,
} from "./component-registry.plugin.js";
import motionCatalogPlugin, {
  provider as motionCatalogProvider,
} from "./motion-catalog.plugin.js";
import { summarizeProjectProfile } from "../../analysis/project-profile.js";
import { summarizeCreativeBrief } from "../../analysis/creative-brief.js";
import { INTENT_CATEGORIES } from "../../analysis/intent-taxonomy.js";
import type { RegisteredComponentMetadata } from "../../providers/component-registry-provider.js";

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

  // --- component registry plugin: register/search/get, real execution ----
  registry.register(componentRegistryPlugin);
  await registry.enable("example-component-registry");
  const componentFixture: RegisteredComponentMetadata = {
    id: "card-pricing",
    name: "PricingCard",
    category: "card",
    filePath: "components/ui/pricing-card.tsx",
    variants: ["default", "highlighted"],
    dependencies: ["framer-motion"],
    animated: true,
    themeable: true,
    darkModeSupport: true,
    respectsReducedMotion: true,
    usageExample: "<PricingCard plan={plan} />",
  };
  componentRegistryProvider.register(componentFixture);
  assert(
    componentRegistryProvider.get("card-pricing")?.name === "PricingCard",
    "component registry get() finds a registered component by id",
  );
  const cardSearchResults = await componentRegistryProvider.search({ category: "card" });
  assert(
    cardSearchResults.some((entry) => entry.id === "card-pricing"),
    "component registry search() finds the registered component by category",
  );
  assert(
    registry
      .getByCapability("component-registry")
      .some((plugin) => plugin.metadata.id === "example-component-registry"),
    "getByCapability finds the enabled component-registry plugin",
  );

  // --- motion catalog plugin: recommend() heuristic, real execution -------
  registry.register(motionCatalogPlugin);
  await registry.enable("example-motion-catalog");
  const heroRecommendations = motionCatalogProvider.recommend(
    "hero section reveal entrance",
  );
  assert(
    heroRecommendations.some((entry) => entry.id === "hero-reveal"),
    "motion catalog recommend() surfaces HeroReveal for a hero-section use case",
  );
  assert(
    registry
      .getByCapability("motion-catalog")
      .some((plugin) => plugin.metadata.id === "example-motion-catalog"),
    "getByCapability finds the enabled motion-catalog plugin",
  );

  // --- registry.list() reflects real enabled/disabled state ---------------
  const listed = registry.list();
  assert(
    listed.find((entry) => entry.metadata.id === "example-component-registry")
      ?.enabled === true,
    "list() reports the component-registry plugin as enabled",
  );
  assert(
    listed.find((entry) => entry.metadata.id === "example-figma-inspiration")?.enabled ===
      false,
    "list() reports the figma plugin as registered but not enabled (its enable() was rejected above)",
  );

  // --- unregister(): rejects while enabled, succeeds once disabled --------
  let unregisterRejected = false;
  try {
    registry.unregister("example-motion-catalog");
  } catch {
    unregisterRejected = true;
  }
  assert(unregisterRejected, "unregister() throws on a still-enabled plugin");

  await registry.disable("example-component-registry");
  registry.unregister("example-component-registry");
  assert(
    registry.get("example-component-registry") === undefined,
    "unregister() removes a disabled plugin from the registry",
  );

  // --- analysis summarizers: real string output against fixture data ------
  const profileSummary = summarizeProjectProfile({
    framework: {
      name: "Next.js (App Router)",
      version: "14.2.0",
      routingStyle: "app router",
    },
    styling: { system: "Tailwind CSS", designTokensFound: ["--color-primary"] },
    motion: {
      librariesInstalled: ["framer-motion"],
      existingReducedMotionHandling: true,
    },
    typescript: { strict: true, pathAliases: ["@/*"] },
    namingConventions: {
      componentFiles: "PascalCase.tsx",
      hookFiles: "camelCase useX.ts",
    },
  });
  assert(
    profileSummary.includes("Framework: Next.js (App Router) (14.2.0)"),
    "summarizeProjectProfile renders the framework line",
  );
  assert(
    profileSummary.includes("Existing reduced-motion handling: yes"),
    "summarizeProjectProfile renders motion.existingReducedMotionHandling",
  );

  const briefSummary = summarizeCreativeBrief({
    goals: ["Convert cold traffic into demo signups"],
    constraints: ["Ship within the existing Tailwind design tokens"],
    audience: "A cold visitor comparing options",
    visualStyle: "Confident and restrained, one accent moment",
    interactionModel: "Linear scroll, one primary CTA repeated",
    accessibilityConsiderations: [],
    performanceTargets: [],
    animationStrategy: "stripe preset",
  });
  assert(
    briefSummary.includes("Goals: Convert cold traffic into demo signups"),
    "summarizeCreativeBrief renders goals",
  );
  assert(
    briefSummary.includes("Animation strategy: stripe preset"),
    "summarizeCreativeBrief renders animation strategy",
  );

  // --- intent taxonomy: structural integrity of the lookup table ----------
  assert(
    INTENT_CATEGORIES.length === 11,
    "INTENT_CATEGORIES has all 11 documented categories",
  );
  const intentIds = new Set(INTENT_CATEGORIES.map((category) => category.id));
  assert(
    intentIds.size === INTENT_CATEGORIES.length,
    "every INTENT_CATEGORIES entry has a unique id",
  );
  assert(
    INTENT_CATEGORIES.every((category) => category.coreFeatures.length > 0),
    "every INTENT_CATEGORIES entry documents at least one core feature",
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
