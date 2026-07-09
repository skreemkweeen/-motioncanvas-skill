import type { Plugin } from "../types.js";
import { createLocalComponentRegistry } from "../../providers/local-component-registry.js";
import type { ComponentQuery } from "../../providers/component-registry-provider.js";

/**
 * Wraps the local ComponentRegistryProvider from PR#2 — registered here so
 * the smoke test actually exercises it (register/search/get/dispose).
 * Before this plugin existed, the provider was real, typechecked code with
 * zero execution coverage.
 */
export const provider = createLocalComponentRegistry();

const plugin: Plugin = {
  metadata: {
    id: "example-component-registry",
    name: "Example: local component registry",
    version: "1.0.0",
    description:
      "In-memory ComponentRegistryProvider for registering/searching components.",
    capabilities: ["component-registry"],
    compatibleWith: "^1.0.0",
  },
  configSchema: [],

  initialize(context) {
    return provider.initialize(context.config);
  },

  configure() {
    // No configuration needed.
  },

  execute(input) {
    return provider.search(input as ComponentQuery);
  },

  dispose() {
    return provider.dispose();
  },
};

export default plugin;
