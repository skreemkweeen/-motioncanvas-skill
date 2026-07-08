/**
 * Named MotionLibraryProvider, not "MotionProvider" — that name is already
 * the React component in snippets/motion-provider.tsx, and reusing it here
 * would collide if both were ever imported in the same file.
 *
 * See local-motion-library.ts for a real, working implementation cataloging
 * the actual primitives shipped in snippets/motion/.
 */

import type { Provider } from "./types";

export interface MotionPrimitiveMetadata {
  id: string;
  name: string;
  /** Relative to the skill root, e.g. "snippets/motion/fade.tsx". */
  filePath: string;
  kind: "component" | "hook" | "tokens";
  description: string;
  dependencies: readonly string[];
  respectsReducedMotion: boolean;
}

export interface MotionQuery {
  keyword?: string;
  kind?: MotionPrimitiveMetadata["kind"];
}

export interface MotionLibraryProvider extends Provider<
  MotionQuery,
  MotionPrimitiveMetadata
> {
  /**
   * Keyword-heuristic shortlist for a described use case (e.g. "hero
   * section", "pointer-following card highlight") — deterministic string
   * matching against each primitive's name/description, not a model call.
   * See local-motion-library.ts for the actual matching logic.
   */
  recommend(useCase: string): MotionPrimitiveMetadata[];
}
