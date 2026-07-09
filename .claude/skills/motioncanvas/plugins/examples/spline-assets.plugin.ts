import type { Plugin } from "../types.js";
import { createSplineAssetProvider } from "../../providers/spline-asset-provider.js";
import type { AssetProvider, AssetQuery } from "../../providers/asset-provider.js";

let provider: AssetProvider | undefined;

const plugin: Plugin = {
  metadata: {
    id: "example-spline-assets",
    name: "Example: Spline local assets",
    version: "1.0.0",
    description:
      "AssetProvider listing .splinecode files in a directory — real fs access, no network, no fabricated scenes.",
    capabilities: ["asset-resolution"],
    compatibleWith: "^1.0.0",
  },
  configSchema: [
    {
      key: "directory",
      required: true,
      description: "Directory to scan for .splinecode exports.",
    },
  ],

  initialize() {
    // Provider is created in configure(), once the directory is known.
  },

  configure(config) {
    provider = createSplineAssetProvider({ directory: config.directory as string });
    return provider.initialize();
  },

  execute(input) {
    if (!provider) throw new Error("example-spline-assets plugin was not configured.");
    return provider.search(input as AssetQuery);
  },

  dispose() {
    return provider?.dispose();
  },
};

export default plugin;
