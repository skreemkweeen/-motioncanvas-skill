/**
 * Compiles DesignTokens into a standalone TypeScript module of token-name
 * union types + const arrays — for typing a component prop like
 * `spacing?: SpacingToken` in a target project without hand-copying the
 * scale from references/design-system.md.
 */

import type { DesignTokens } from "./design-tokens.js";

function unionType(typeName: string, constName: string, keys: readonly string[]): string {
  const union = keys.map((key) => `"${key}"`).join(" | ");
  const arrayLiteral = keys.map((key) => `"${key}"`).join(", ");
  return (
    `export type ${typeName} = ${union};\n` +
    `export const ${constName}: readonly ${typeName}[] = [${arrayLiteral}];`
  );
}

export function compileToTypeDeclarations(tokens: DesignTokens): string {
  const typographyKeys = Object.keys(tokens.typography);
  const spacingKeys = Object.keys(tokens.spacing);
  const radiusKeys = Object.keys(tokens.radius);
  const shadowKeys = Object.keys(tokens.shadow.light);
  const colorKeys = Object.keys(tokens.color.light);

  return `/**
 * GENERATED FILE — do not edit directly.
 * Source of truth: tokens/design-tokens.ts. Regenerate with \`npm run tokens:build\`.
 */

${unionType("TypographyToken", "TYPOGRAPHY_TOKENS", typographyKeys)}

${unionType("SpacingToken", "SPACING_TOKENS", spacingKeys)}

${unionType("RadiusToken", "RADIUS_TOKENS", radiusKeys)}

${unionType("ShadowToken", "SHADOW_TOKENS", shadowKeys)}

${unionType("ColorToken", "COLOR_TOKENS", colorKeys)}
`;
}
