/**
 * Compiles DesignTokens into a plain JSON export — for non-TypeScript
 * consumers (a design tool import, a style-dictionary-style pipeline in
 * some other language) that just want the raw values.
 */

import type { DesignTokens } from "./design-tokens.js";

export function compileToJson(tokens: DesignTokens): string {
  return `${JSON.stringify(tokens, null, 2)}\n`;
}
