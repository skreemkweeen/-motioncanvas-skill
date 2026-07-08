/**
 * Base shape every provider in this directory implements. Deliberately
 * small — domain-specific providers (see the sibling files) add only the
 * methods their domain actually needs, rather than inheriting a large
 * surface they'd have to stub out with fake bodies.
 */

export interface ProviderMetadata {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  /** What this provider can actually be asked to do, e.g. ["search", "register"]. */
  readonly capabilities: readonly string[];
}

export interface Provider<TQuery, TResult> {
  readonly metadata: ProviderMetadata;
  initialize(config?: Record<string, unknown>): Promise<void> | void;
  search(query: TQuery): Promise<TResult[]> | TResult[];
  dispose(): Promise<void> | void;
}
