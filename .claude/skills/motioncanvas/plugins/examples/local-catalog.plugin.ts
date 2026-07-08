import type { Plugin } from "../types.js";
import { createLocalJsonDesignInspirationProvider } from "../../providers/local-json-design-inspiration-provider.js";
import type {
  DesignInspirationProvider,
  DesignInspirationQuery,
} from "../../providers/design-inspiration-provider.js";

// Stands in for 21st.dev — the same factory instantiated with a different
// sourceName/catalogPath is exactly what a Magic UI or Aceternity UI adapter
// looks like; there's no reason to triplicate this file for each source.
let provider: DesignInspirationProvider | undefined;

const plugin: Plugin = {
  metadata: {
    id: "example-21st-dev",
    name: "Example: 21st.dev (local catalog)",
    version: "1.0.0",
    description:
      "DesignInspirationProvider reading a user-curated local JSON catalog standing in for 21st.dev — no live scraping.",
    capabilities: ["design-inspiration"],
    compatibleWith: "^1.0.0",
  },
  configSchema: [
    {
      key: "catalogPath",
      required: true,
      description: "Path to a JSON file of LocalCatalogEntry[].",
    },
  ],

  initialize() {
    // Provider is created in configure(), once catalogPath is known.
  },

  configure(config) {
    provider = createLocalJsonDesignInspirationProvider({
      sourceName: "21st.dev",
      catalogPath: config.catalogPath as string,
    });
    return provider.initialize();
  },

  execute(input) {
    if (!provider) throw new Error("example-21st-dev plugin was not configured.");
    return provider.search(input as DesignInspirationQuery);
  },

  dispose() {
    return provider?.dispose();
  },
};

export default plugin;
