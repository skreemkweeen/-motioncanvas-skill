/**
 * Interface only — no implementation ships in this repo. Spline scenes, Rive
 * files, and Lottie JSON are genuinely asset-driven: a real implementation
 * needs an actual exported file sitting somewhere in the consuming project,
 * supplied by the user. Do not fabricate a remote asset URL or pretend to
 * generate a `.splinecode`/`.riv` file — if no asset exists locally, ask the
 * user for the export, or build the equivalent with React Three Fiber/CSS
 * instead (see references/providers.md).
 */

import type { Provider } from "./types";

export type AssetKind = "spline-scene" | "rive-file" | "lottie-json" | "image" | "video";

export interface AssetQuery {
  kind?: AssetKind;
  keyword?: string;
}

export interface AssetMetadata {
  id: string;
  kind: AssetKind;
  /** Path to a file actually present in the consuming project. Never a fabricated remote URL. */
  path: string;
  description?: string;
}

export interface AssetProvider extends Provider<AssetQuery, AssetMetadata> {
  /**
   * Resolves an asset's local metadata. Must return `undefined` (not throw a
   * generic error, not invent a placeholder) for anything not actually
   * present locally.
   */
  resolve(id: string): Promise<AssetMetadata | undefined> | AssetMetadata | undefined;
}
