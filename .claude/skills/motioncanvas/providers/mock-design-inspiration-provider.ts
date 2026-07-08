/**
 * Explicit test double — not a real source, clearly labeled as such in its
 * own metadata and result titles. Use this to exercise the plugin
 * runtime/registry (or anything consuming a DesignInspirationProvider)
 * without needing a live catalog file or an API token.
 */

import type {
  DesignInspirationProvider,
  DesignInspirationQuery,
  DesignInspirationResult,
} from "./design-inspiration-provider.js";

const MOCK_RESULTS: readonly DesignInspirationResult[] = [
  {
    id: "mock-1",
    title: "[MOCK] Example hero pattern",
    sourceName: "Mock",
    notes: "Fixture data for testing — not a real inspiration source.",
  },
  {
    id: "mock-2",
    title: "[MOCK] Example card pattern",
    sourceName: "Mock",
    notes: "Fixture data for testing — not a real inspiration source.",
  },
];

export function createMockDesignInspirationProvider(): DesignInspirationProvider {
  return {
    metadata: {
      id: "mock-design-inspiration",
      name: "Mock design inspiration (test double)",
      version: "1.0.0",
      capabilities: ["search", "score", "preview"],
    },

    initialize() {
      // No setup — static in-memory fixture.
    },

    search(_query: DesignInspirationQuery) {
      return [...MOCK_RESULTS];
    },

    score(_result: DesignInspirationResult, _query: DesignInspirationQuery) {
      return 1;
    },

    preview(result: DesignInspirationResult) {
      return result.notes;
    },

    dispose() {
      // Nothing held open.
    },
  };
}
