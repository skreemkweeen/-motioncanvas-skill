/**
 * Interface only — no implementation ships in this repo. A real adapter for
 * a source like 21st.dev, Mobbin, or Awwwards would live alongside this file
 * (e.g. `twentyfirst-dev-provider.ts`) and implement `DesignInspirationProvider`
 * against that source's actual API or a user-supplied export. Until such an
 * adapter exists, do not claim one does — see references/providers.md for
 * how "inspiration" is handled without live access.
 */

import type { Provider } from "./types";

export interface DesignInspirationQuery {
  category:
    "hero" | "pricing" | "navigation" | "card" | "form" | "dashboard" | "footer" | string;
  keywords?: readonly string[];
  style?: "minimal" | "bold" | "playful" | "corporate" | "brutalist" | string;
}

export interface DesignInspirationResult {
  id: string;
  title: string;
  /** e.g. "Aceternity UI", "Mobbin" — human-readable, not a fetched identifier. */
  sourceName: string;
  /** Only present if the user or caller actually supplied one. Never fabricated. */
  sourceUrl?: string;
  /** What pattern/technique to reimplement — guidance text, not markup to copy. */
  notes: string;
}

export interface DesignInspirationProvider extends Provider<
  DesignInspirationQuery,
  DesignInspirationResult
> {
  /**
   * A score for how well a result fits the query. Implementations must be
   * explicit in their own docs about whether this is a simple heuristic
   * (keyword overlap) or backed by a real model/API — never present an
   * unearned numeric confidence.
   */
  score(
    result: DesignInspirationResult,
    query: DesignInspirationQuery,
  ): Promise<number> | number;
  /**
   * A textual description of the result suitable for showing a user before
   * they commit to it. Must not fetch or render live remote content unless
   * the implementation genuinely integrates with a live API.
   */
  preview(result: DesignInspirationResult): Promise<string> | string;
}

// Deliberately not included: generate()/install(). Turning a chosen pattern
// into working code in the target project is the coding agent's job (the
// SKILL.md workflow itself), not a responsibility a provider should own —
// duplicating that here would just be a second, weaker code generator.
