import type { Plugin } from "../types.js";
import type {
  DesignInspirationQuery,
  DesignInspirationResult,
} from "../../providers/design-inspiration-provider.js";
import mockPlugin from "./mock-inspiration.plugin.js";
import catalogPlugin from "./local-catalog.plugin.js";

/**
 * Demonstrates real cross-plugin composition and dependency resolution:
 * depends on the two plugins below, so enabling this one (once its
 * dependencies are already enabled — see plugins/README.md) exercises
 * PluginRegistry's topological ordering for real, not just in theory.
 */
const plugin: Plugin = {
  metadata: {
    id: "example-aggregator",
    name: "Example: aggregated design inspiration",
    version: "1.0.0",
    description:
      "Combines results from example-mock-inspiration and example-21st-dev into one search.",
    capabilities: ["design-inspiration"],
    dependencies: ["example-mock-inspiration", "example-21st-dev"],
    compatibleWith: "^1.0.0",
  },
  configSchema: [],

  initialize() {
    // Nothing of its own to set up — it only calls into its dependencies.
  },

  configure() {
    // No configuration needed.
  },

  async execute(input) {
    const query = input as DesignInspirationQuery;
    const [mockResults, catalogResults] = await Promise.all([
      Promise.resolve(mockPlugin.execute(query)) as Promise<DesignInspirationResult[]>,
      Promise.resolve(catalogPlugin.execute(query)) as Promise<DesignInspirationResult[]>,
    ]);
    return [...mockResults, ...catalogResults];
  },

  dispose() {
    // Its dependencies own their own disposal; the registry disposes them
    // separately when they're disabled.
  },
};

export default plugin;
