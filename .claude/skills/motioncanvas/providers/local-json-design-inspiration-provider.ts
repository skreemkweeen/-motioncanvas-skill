/**
 * Generic DesignInspirationProvider backed by a local JSON catalog file the
 * user curates themselves — no network access, no scraping. Instantiate one
 * of these per source (21st.dev, Magic UI, Aceternity UI, ...) pointed at a
 * JSON file matching `LocalCatalogEntry[]`. If the file doesn't exist,
 * initialize()/search() fail loudly with an explanation instead of quietly
 * behaving like "no matches found."
 */

import { readFile } from "node:fs/promises";
import type {
  DesignInspirationProvider,
  DesignInspirationQuery,
  DesignInspirationResult,
} from "./design-inspiration-provider.js";

export interface LocalCatalogEntry {
  id: string;
  title: string;
  category: string;
  keywords: readonly string[];
  style?: string;
  /** What pattern/technique to reimplement — guidance text, not markup to copy. */
  notes: string;
  sourceUrl?: string;
}

export interface LocalJsonDesignInspirationProviderOptions {
  /** e.g. "21st.dev", "Magic UI", "Aceternity UI" — used for metadata and result labeling. */
  sourceName: string;
  /** Path to a user-maintained JSON file containing `LocalCatalogEntry[]`. */
  catalogPath: string;
}

export function createLocalJsonDesignInspirationProvider(
  options: LocalJsonDesignInspirationProviderOptions,
): DesignInspirationProvider {
  const { sourceName, catalogPath } = options;
  let cache: LocalCatalogEntry[] | undefined;

  async function loadCatalog(): Promise<LocalCatalogEntry[]> {
    if (cache) return cache;
    let raw: string;
    try {
      raw = await readFile(catalogPath, "utf-8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new Error(
          `No local catalog found at "${catalogPath}" for ${sourceName}. This provider reads ` +
            `a user-curated JSON file (see LocalCatalogEntry) — it does not fetch ${sourceName} live.`,
        );
      }
      throw error;
    }
    cache = JSON.parse(raw) as LocalCatalogEntry[];
    return cache;
  }

  function toResult(entry: LocalCatalogEntry): DesignInspirationResult {
    return {
      id: entry.id,
      title: entry.title,
      sourceName,
      sourceUrl: entry.sourceUrl,
      notes: entry.notes,
    };
  }

  return {
    metadata: {
      id: `local-json-${sourceName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: `${sourceName} (local catalog)`,
      version: "1.0.0",
      capabilities: ["search", "score", "preview"],
    },

    async initialize() {
      await loadCatalog(); // fail fast if the file is missing/malformed
    },

    async search(query: DesignInspirationQuery) {
      const catalog = await loadCatalog();
      const keywords = query.keywords;
      const style = query.style;

      return catalog
        .filter((entry) => entry.category === query.category)
        .filter((entry) =>
          keywords && keywords.length > 0
            ? keywords.some((keyword) =>
                entry.keywords.some((entryKeyword) =>
                  entryKeyword.toLowerCase().includes(keyword.toLowerCase()),
                ),
              )
            : true,
        )
        .filter((entry) => (style ? entry.style === style : true))
        .map(toResult);
    },

    score(result: DesignInspirationResult, query: DesignInspirationQuery) {
      const entry = cache?.find((candidate) => candidate.id === result.id);
      const keywords = query.keywords;
      if (!entry || !keywords || keywords.length === 0) return 0.5;

      const overlap = keywords.filter((keyword) =>
        entry.keywords.some(
          (entryKeyword) => entryKeyword.toLowerCase() === keyword.toLowerCase(),
        ),
      ).length;
      return Math.min(1, overlap / keywords.length);
    },

    preview(result: DesignInspirationResult) {
      return result.notes;
    },

    dispose() {
      cache = undefined;
    },
  };
}
