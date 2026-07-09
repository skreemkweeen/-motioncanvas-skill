import type { Plugin } from "../types.js";
import { createFigmaDesignInspirationProvider } from "../../providers/figma-design-inspiration-provider.js";
import type {
  DesignInspirationProvider,
  DesignInspirationQuery,
} from "../../providers/design-inspiration-provider.js";

let provider: DesignInspirationProvider | undefined;

/**
 * Registered in the smoke test to verify its config validation (a missing
 * apiToken/fileKeys should fail loudly) — execute() is never called there,
 * since that would require a live Figma API token and a real file this repo
 * doesn't have. See providers/figma-design-inspiration-provider.ts's own doc
 * comment for what actually is verified (the response-mapping function,
 * against a fixture).
 */
const plugin: Plugin = {
  metadata: {
    id: "example-figma-inspiration",
    name: "Example: Figma (official REST API)",
    version: "1.0.0",
    description:
      "DesignInspirationProvider over Figma's official REST API — requires a real access token.",
    capabilities: ["design-inspiration"],
    compatibleWith: "^1.0.0",
  },
  configSchema: [
    { key: "apiToken", required: true, description: "Figma personal access token." },
    {
      key: "fileKeys",
      required: true,
      description: "Figma file key(s) to read components from.",
    },
  ],

  initialize() {
    // Provider is created in configure(), once credentials are known.
  },

  configure(config) {
    provider = createFigmaDesignInspirationProvider({
      apiToken: config.apiToken as string,
      fileKeys: config.fileKeys as readonly string[],
    });
    return provider.initialize();
  },

  execute(input) {
    if (!provider)
      throw new Error("example-figma-inspiration plugin was not configured.");
    return provider.search(input as DesignInspirationQuery);
  },

  dispose() {
    return provider?.dispose();
  },
};

export default plugin;
