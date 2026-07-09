/**
 * Real, local-file-only AssetProvider for Spline scene exports. Spline's
 * actual product is an exported `.splinecode` file loaded at runtime by the
 * official `@splinetool/runtime` package in the *target* project — not a
 * dependency of this skill repo (see the usage note at the bottom). This
 * provider only ever reports files that genuinely exist on disk; it never
 * fabricates a remote asset URL or claims to fetch/generate a scene.
 */

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import type { AssetMetadata, AssetProvider, AssetQuery } from "./asset-provider.js";

export interface SplineAssetProviderOptions {
  /** Directory to scan for .splinecode exports, e.g. "public/spline/". */
  directory: string;
}

export function createSplineAssetProvider(
  options: SplineAssetProviderOptions,
): AssetProvider {
  const { directory } = options;

  async function listSceneFiles(): Promise<string[]> {
    let entries: string[];
    try {
      entries = await readdir(directory);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
    return entries.filter((entry) => entry.endsWith(".splinecode"));
  }

  function toMetadata(fileName: string): AssetMetadata {
    return {
      id: fileName.replace(/\.splinecode$/, ""),
      kind: "spline-scene",
      path: path.join(directory, fileName),
    };
  }

  return {
    metadata: {
      id: "spline-local-assets",
      name: "Spline (local .splinecode exports)",
      version: "1.0.0",
      capabilities: ["search", "resolve"],
    },

    initialize() {
      // Directory is read lazily on each call, not cached, so files added
      // after startup are picked up without re-initializing.
    },

    async search(query: AssetQuery) {
      if (query.kind && query.kind !== "spline-scene") return [];
      const files = await listSceneFiles();
      const keyword = query.keyword;
      const filtered = keyword
        ? files.filter((file) => file.toLowerCase().includes(keyword.toLowerCase()))
        : files;
      return filtered.map(toMetadata);
    },

    async resolve(id: string) {
      const files = await listSceneFiles();
      const match = files.find((file) => file.replace(/\.splinecode$/, "") === id);
      if (!match) return undefined;

      const fullPath = path.join(directory, match);
      const stats = await stat(fullPath).catch(() => undefined);
      if (!stats) return undefined;

      return toMetadata(match);
    },

    dispose() {
      // Nothing held open between calls.
    },
  };
}

/**
 * Usage in the target project (not run here): load the resolved `.path`
 * with the official runtime —
 *
 *   import { Application } from "@splinetool/runtime";
 *   const app = new Application(canvas);
 *   await app.load(resolvedAsset.path);
 *
 * `@splinetool/runtime` is a dependency of the target project, not this
 * skill repo — don't add it here just to document the pattern.
 */
