import type { Plugin } from "../types.js";
import { createLocalMotionLibrary } from "../../providers/local-motion-library.js";
import type { MotionQuery } from "../../providers/motion-library-provider.js";

/**
 * Wraps the local MotionLibraryProvider from PR#2 — registered here so the
 * smoke test actually exercises it (search + the keyword-overlap
 * recommend() heuristic). Before this plugin existed, the provider was
 * real, typechecked code with zero execution coverage.
 */
export const provider = createLocalMotionLibrary();

const plugin: Plugin = {
  metadata: {
    id: "example-motion-catalog",
    name: "Example: local motion catalog",
    version: "1.0.0",
    description:
      "Static MotionLibraryProvider cataloging snippets/motion/'s own primitives.",
    capabilities: ["motion-catalog"],
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
    return provider.search(input as MotionQuery);
  },

  dispose() {
    return provider.dispose();
  },
};

export default plugin;
