/**
 * A real, working in-memory ComponentRegistryProvider. No external service
 * is involved here, so — unlike DesignInspirationProvider — there's no
 * reason for this one to be interface-only.
 *
 * Registrations only last for the process lifetime. Swap for a persisted
 * store (a JSON file committed to the target repo, a database) behind the
 * same interface if a project needs registrations to survive a restart —
 * callers wouldn't need to change.
 */

import type {
  ComponentQuery,
  ComponentRegistryProvider,
  RegisteredComponentMetadata,
} from "./component-registry-provider.js";

export function createLocalComponentRegistry(): ComponentRegistryProvider {
  const entries = new Map<string, RegisteredComponentMetadata>();

  return {
    metadata: {
      id: "local-component-registry",
      name: "Local Component Registry",
      version: "1.0.0",
      capabilities: ["search", "register", "get"],
    },

    initialize() {
      // No setup needed for an in-memory store.
    },

    register(metadata) {
      entries.set(metadata.id, metadata);
    },

    get(id) {
      return entries.get(id);
    },

    search(query: ComponentQuery) {
      return Array.from(entries.values()).filter((entry) => {
        if (query.category && entry.category !== query.category) return false;
        if (query.keyword) {
          const haystack = `${entry.name} ${entry.variants.join(" ")}`.toLowerCase();
          if (!haystack.includes(query.keyword.toLowerCase())) return false;
        }
        return true;
      });
    },

    dispose() {
      entries.clear();
    },
  };
}
