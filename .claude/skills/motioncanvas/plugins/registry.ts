/**
 * Real, working plugin registry: registration, a minimal-but-correct
 * version-compatibility check, dependency resolution (topological sort with
 * cycle detection), config validation, and enable/disable state. No
 * discovery, no sandboxing — see discover.ts for the (also real) filesystem
 * auto-discovery step that feeds plugins into this registry.
 */

import type { Plugin, PluginConfigSchema, PluginMetadata } from "./types.js";

/** The plugin API this registry implements. Bump on a breaking change to the `Plugin` contract. */
export const PLUGIN_API_VERSION = "1.0.0";

export function parseVersion(version: string): readonly [number, number, number] {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(
      `Invalid version "${version}" — expected "major.minor.patch" (no pre-release/build metadata).`,
    );
  }
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

export function compareVersions(a: string, b: string): -1 | 0 | 1 {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] > pb[i]) return 1;
    if (pa[i] < pb[i]) return -1;
  }
  return 0;
}

/**
 * Checks whether `version` satisfies `range`. Supports exactly: an exact
 * version ("1.2.3"), caret ranges ("^1.2.3", with the standard semver
 * major=0 special case), tilde ranges ("~1.2.3"), ">=1.2.3", and "*". This
 * is a deliberately small, correct subset of semver — not "||", not
 * x-ranges, not pre-release tags. Anything else throws rather than
 * silently mis-evaluating.
 */
export function satisfiesRange(version: string, range: string): boolean {
  if (range === "*") return true;

  if (range.startsWith("^")) {
    const base = range.slice(1);
    const [major, minor, patch] = parseVersion(base);
    const upper: [number, number, number] =
      major > 0 ? [major + 1, 0, 0] : minor > 0 ? [0, minor + 1, 0] : [0, 0, patch + 1];
    return (
      compareVersions(version, base) >= 0 &&
      compareVersions(version, `${upper[0]}.${upper[1]}.${upper[2]}`) < 0
    );
  }

  if (range.startsWith("~")) {
    const base = range.slice(1);
    const [major, minor] = parseVersion(base);
    return (
      compareVersions(version, base) >= 0 &&
      compareVersions(version, `${major}.${minor + 1}.0`) < 0
    );
  }

  if (range.startsWith(">=")) {
    return compareVersions(version, range.slice(2)) >= 0;
  }

  return compareVersions(version, range) === 0;
}

/** Missing required config keys, or an empty array if the config is complete. */
export function validateConfig(
  schema: PluginConfigSchema,
  config: Record<string, unknown>,
): string[] {
  return schema
    .filter((field) => field.required && config[field.key] === undefined)
    .map((field) => field.key);
}

interface RegistryEntry {
  plugin: Plugin;
  enabled: boolean;
}

export class PluginRegistry {
  private entries = new Map<string, RegistryEntry>();

  register(plugin: Plugin): void {
    if (this.entries.has(plugin.metadata.id)) {
      throw new Error(`Plugin "${plugin.metadata.id}" is already registered.`);
    }
    if (!satisfiesRange(PLUGIN_API_VERSION, plugin.metadata.compatibleWith)) {
      throw new Error(
        `Plugin "${plugin.metadata.id}" targets API range "${plugin.metadata.compatibleWith}", ` +
          `incompatible with runtime API version ${PLUGIN_API_VERSION}.`,
      );
    }
    this.entries.set(plugin.metadata.id, { plugin, enabled: false });
  }

  unregister(id: string): void {
    const entry = this.entries.get(id);
    if (entry?.enabled) {
      throw new Error(
        `Cannot unregister "${id}" while it is enabled — disable it first.`,
      );
    }
    this.entries.delete(id);
  }

  async enable(id: string, config: Record<string, unknown> = {}): Promise<void> {
    const order = this.resolveEnableOrder([id]);
    for (const pluginId of order) {
      const entry = this.entries.get(pluginId);
      if (!entry) throw new Error(`Plugin "${pluginId}" is not registered.`);
      if (entry.enabled) continue;

      // Only the originally requested plugin gets the caller's config —
      // transitively-pulled-in dependencies are enabled with their defaults
      // (an empty config), since the caller wasn't asked for their settings.
      const cfg = pluginId === id ? config : {};
      const missing = validateConfig(entry.plugin.configSchema, cfg);
      if (missing.length > 0) {
        throw new Error(
          `Plugin "${pluginId}" is missing required config: ${missing.join(", ")}`,
        );
      }

      await entry.plugin.initialize({ config: cfg });
      await entry.plugin.configure(cfg);
      entry.enabled = true;
    }
  }

  async disable(id: string): Promise<void> {
    const entry = this.entries.get(id);
    if (!entry) throw new Error(`Plugin "${id}" is not registered.`);

    const dependents = Array.from(this.entries.values()).filter(
      (candidate) =>
        candidate.enabled && candidate.plugin.metadata.dependencies?.includes(id),
    );
    if (dependents.length > 0) {
      throw new Error(
        `Cannot disable "${id}": still required by ` +
          `${dependents.map((candidate) => candidate.plugin.metadata.id).join(", ")}.`,
      );
    }

    if (entry.enabled) {
      await entry.plugin.dispose();
      entry.enabled = false;
    }
  }

  getByCapability(capability: string): Plugin[] {
    return Array.from(this.entries.values())
      .filter(
        (entry) =>
          entry.enabled && entry.plugin.metadata.capabilities.includes(capability),
      )
      .map((entry) => entry.plugin);
  }

  get(id: string): Plugin | undefined {
    return this.entries.get(id)?.plugin;
  }

  list(): Array<{ metadata: PluginMetadata; enabled: boolean }> {
    return Array.from(this.entries.values()).map((entry) => ({
      metadata: entry.plugin.metadata,
      enabled: entry.enabled,
    }));
  }

  /** Topological order to enable `requestedIds` and their transitive dependencies. */
  private resolveEnableOrder(requestedIds: string[]): string[] {
    const order: string[] = [];
    const visiting = new Set<string>();
    const visited = new Set<string>();

    const visit = (id: string, path: readonly string[]): void => {
      if (visited.has(id)) return;
      if (visiting.has(id)) {
        throw new Error(`Circular plugin dependency: ${[...path, id].join(" -> ")}`);
      }
      const entry = this.entries.get(id);
      if (!entry) {
        const requiredBy = path[path.length - 1];
        throw new Error(
          `Plugin "${id}" is not registered` +
            (requiredBy ? ` (required by "${requiredBy}").` : "."),
        );
      }
      visiting.add(id);
      for (const dependencyId of entry.plugin.metadata.dependencies ?? []) {
        visit(dependencyId, [...path, id]);
      }
      visiting.delete(id);
      visited.add(id);
      order.push(id);
    };

    for (const id of requestedIds) visit(id, []);
    return order;
  }
}
