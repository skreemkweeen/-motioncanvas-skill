/**
 * Core plugin contract. A plugin is a self-contained in-process TypeScript
 * object that registers one or more capabilities (a design-inspiration
 * adapter, an asset resolver, ...) with the runtime in `registry.ts`. There
 * is no separate plugin process, sandboxing, or loading of untrusted code —
 * "discovery" (`discover.ts`) is a Node-side dev-time convenience for
 * loading plugin modules from a directory by convention, not a marketplace
 * or a security boundary.
 */

export interface PluginMetadata {
  readonly id: string;
  readonly name: string;
  /** "major.minor.patch" — this plugin's own version, not the API version it targets. */
  readonly version: string;
  readonly description: string;
  /** What this plugin can be asked to do, e.g. ["design-inspiration", "asset-resolution"]. */
  readonly capabilities: readonly string[];
  /** Other plugin ids that must be enabled before this one. */
  readonly dependencies?: readonly string[];
  /**
   * Range this plugin was written against, e.g. "^1.0.0" — checked against
   * the runtime's `PLUGIN_API_VERSION` in registry.ts. See
   * `satisfiesRange`'s doc comment for exactly which range forms are
   * supported; this is a small, honestly-scoped subset of semver, not a
   * full implementation.
   */
  readonly compatibleWith: string;
}

export interface PluginConfigField {
  readonly key: string;
  readonly required: boolean;
  readonly description: string;
}

/**
 * Declarative shape of the config a plugin accepts. Deliberately not a full
 * JSON-schema engine — required/optional key presence is the only thing
 * `registry.ts`'s `validateConfig` checks. A plugin that needs deeper
 * validation (types, formats) does that itself inside `configure()`.
 */
export type PluginConfigSchema = readonly PluginConfigField[];

export interface PluginContext {
  readonly config: Record<string, unknown>;
}

export interface Plugin {
  readonly metadata: PluginMetadata;
  readonly configSchema: PluginConfigSchema;
  initialize(context: PluginContext): Promise<void> | void;
  configure(config: Record<string, unknown>): Promise<void> | void;
  execute(input: unknown): Promise<unknown> | unknown;
  dispose(): Promise<void> | void;
}
