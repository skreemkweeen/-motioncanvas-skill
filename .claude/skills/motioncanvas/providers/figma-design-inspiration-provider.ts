/**
 * Real client against Figma's official REST API
 * (https://www.figma.com/developers/api) for pulling component metadata out
 * of files the caller actually has access to — not a scraper, and there is
 * no "search all of Figma" endpoint to fall back to; a caller must supply
 * file keys it can already open.
 *
 * The live network call can't be exercised from this repo (no token, no
 * call made here). `mapFigmaComponentsToResults` — the part that turns a
 * Figma API response into `DesignInspirationResult`s — is what's actually
 * verified, against a fixture matching Figma's documented response shape.
 */

import type {
  DesignInspirationProvider,
  DesignInspirationQuery,
  DesignInspirationResult,
} from "./design-inspiration-provider.js";

export interface FigmaProviderOptions {
  /** See https://www.figma.com/developers/api#access-tokens. */
  apiToken: string;
  /** Figma file key(s) to pull component metadata from (from each file's URL). */
  fileKeys: readonly string[];
  /** Override for testing; defaults to the real Figma API host. */
  apiBaseUrl?: string;
}

export interface FigmaComponentsResponse {
  meta: {
    components: ReadonlyArray<{
      node_id: string;
      name: string;
      description: string;
    }>;
  };
}

export function mapFigmaComponentsToResults(
  response: FigmaComponentsResponse,
  fileKey: string,
): DesignInspirationResult[] {
  return response.meta.components.map((component) => ({
    id: `figma:${fileKey}:${component.node_id}`,
    title: component.name,
    sourceName: "Figma",
    sourceUrl: `https://www.figma.com/file/${fileKey}?node-id=${component.node_id}`,
    notes: component.description || "No description set on this component in Figma.",
  }));
}

export function createFigmaDesignInspirationProvider(
  options: FigmaProviderOptions,
): DesignInspirationProvider {
  const { apiToken, fileKeys, apiBaseUrl = "https://api.figma.com" } = options;

  async function fetchComponents(fileKey: string): Promise<DesignInspirationResult[]> {
    const response = await fetch(`${apiBaseUrl}/v1/files/${fileKey}/components`, {
      headers: { "X-Figma-Token": apiToken },
    });
    if (!response.ok) {
      throw new Error(
        `Figma API request failed for file "${fileKey}": ${response.status} ${response.statusText}`,
      );
    }
    const body = (await response.json()) as FigmaComponentsResponse;
    return mapFigmaComponentsToResults(body, fileKey);
  }

  return {
    metadata: {
      id: "figma-design-inspiration",
      name: "Figma (official REST API)",
      version: "1.0.0",
      capabilities: ["search", "score", "preview"],
    },

    initialize() {
      if (!apiToken) throw new Error("Figma provider requires apiToken.");
      if (fileKeys.length === 0) {
        throw new Error("Figma provider requires at least one fileKey.");
      }
    },

    async search(_query: DesignInspirationQuery) {
      const results = await Promise.all(fileKeys.map(fetchComponents));
      return results.flat();
    },

    score(_result: DesignInspirationResult, _query: DesignInspirationQuery) {
      // No ranking signal from this endpoint — every match is equally
      // "found in a file you gave us access to."
      return 1;
    },

    preview(result: DesignInspirationResult) {
      return result.notes;
    },

    dispose() {
      // No connection/resources held open between calls.
    },
  };
}
