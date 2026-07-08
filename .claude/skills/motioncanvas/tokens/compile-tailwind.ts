/**
 * Compiles DesignTokens into a plain object shaped for Tailwind's
 * `theme.extend` — referencing the CSS custom properties from
 * snippets/tokens.css rather than duplicating literal values, so a
 * target project only has one place (tokens.css) to actually change a
 * value at runtime/theme-toggle time.
 */

import type { DesignTokens } from "./design-tokens.js";

export interface TailwindThemeExtension {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
}

export function compileToTailwindTheme(tokens: DesignTokens): TailwindThemeExtension {
  const colorKeys = Object.keys(tokens.color.light) as Array<
    keyof DesignTokens["color"]["light"]
  >;
  const colors: Record<string, string> = {};
  for (const key of colorKeys) {
    const cssName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    colors[key] = `var(--color-${cssName})`;
  }

  const spacing: Record<string, string> = {};
  for (const key of Object.keys(tokens.spacing)) {
    spacing[key] = `var(--space-${key})`;
  }

  const borderRadius: Record<string, string> = {};
  for (const key of Object.keys(tokens.radius)) {
    borderRadius[key] = `var(--radius-${key})`;
  }

  const boxShadow: Record<string, string> = {};
  for (const key of Object.keys(tokens.shadow.light)) {
    boxShadow[key] = `var(--shadow-${key})`;
  }

  const fontSize: Record<string, [string, { lineHeight: string }]> = {};
  for (const key of Object.keys(tokens.typography)) {
    fontSize[key] = [
      `var(--font-size-${key})`,
      { lineHeight: `var(--line-height-${key})` },
    ];
  }

  return { colors, spacing, borderRadius, boxShadow, fontSize };
}
