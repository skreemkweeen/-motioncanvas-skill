import type { Plugin } from "../types.js";
import { createMockDesignInspirationProvider } from "../../providers/mock-design-inspiration-provider.js";
import type { DesignInspirationQuery } from "../../providers/design-inspiration-provider.js";

const provider = createMockDesignInspirationProvider();

const plugin: Plugin = {
  metadata: {
    id: "example-mock-inspiration",
    name: "Example: mock design inspiration",
    version: "1.0.0",
    description:
      "Wraps the mock DesignInspirationProvider test double, for exercising the plugin runtime without live data.",
    capabilities: ["design-inspiration"],
    compatibleWith: "^1.0.0",
  },
  configSchema: [],

  initialize(context) {
    return provider.initialize(context.config);
  },

  configure() {
    // No configuration needed for the mock provider.
  },

  execute(input) {
    return provider.search(input as DesignInspirationQuery);
  },

  dispose() {
    return provider.dispose();
  },
};

export default plugin;
