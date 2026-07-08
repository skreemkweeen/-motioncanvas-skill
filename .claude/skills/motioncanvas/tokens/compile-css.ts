/**
 * Compiles DesignTokens into the CSS custom properties file this skill ships
 * as snippets/tokens.css — light tokens on :root, dark overrides on .dark
 * plus a prefers-color-scheme fallback, matching the Shadcn/Tailwind
 * convention documented in that file's own header comment.
 */

import type { DesignTokens } from "./design-tokens.js";

function typographyLines(tokens: DesignTokens): string {
  const order: Array<keyof DesignTokens["typography"]> = [
    "xs",
    "sm",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
  ];
  return order
    .map((key) => {
      const { fontSize, lineHeight } = tokens.typography[key];
      return (
        `  --font-size-${key}: ${fontSize};\n` + `  --line-height-${key}: ${lineHeight};`
      );
    })
    .join("\n");
}

function spacingLines(tokens: DesignTokens): string {
  const order: Array<keyof DesignTokens["spacing"]> = [
    "1",
    "2",
    "3",
    "4",
    "6",
    "8",
    "12",
    "16",
    "24",
    "32",
  ];
  return order.map((key) => `  --space-${key}: ${tokens.spacing[key]};`).join("\n");
}

function radiusLines(tokens: DesignTokens): string {
  const order: Array<keyof DesignTokens["radius"]> = ["sm", "md", "lg", "xl", "full"];
  return order.map((key) => `  --radius-${key}: ${tokens.radius[key]};`).join("\n");
}

function shadowLines(shadow: DesignTokens["shadow"]["light"], indent = "  "): string {
  const order: Array<keyof typeof shadow> = ["sm", "md", "lg", "xl"];
  return order.map((key) => `${indent}--shadow-${key}: ${shadow[key]};`).join("\n");
}

function colorLines(color: DesignTokens["color"]["light"], indent = "  "): string {
  const entries: Array<[string, string]> = [
    ["background", color.background],
    ["foreground", color.foreground],
    ["muted", color.muted],
    ["muted-foreground", color.mutedForeground],
    ["border", color.border],
    ["card", color.card],
    ["card-foreground", color.cardForeground],
    ["primary", color.primary],
    ["primary-foreground", color.primaryForeground],
    ["destructive", color.destructive],
    ["destructive-foreground", color.destructiveForeground],
    ["success", color.success],
    ["success-foreground", color.successForeground],
    ["warning", color.warning],
    ["warning-foreground", color.warningForeground],
  ];
  return entries.map(([name, value]) => `${indent}--color-${name}: ${value};`).join("\n");
}

export function compileToCss(tokens: DesignTokens): string {
  return `/**
 * GENERATED FILE — do not edit directly.
 * Source of truth: tokens/design-tokens.ts. Regenerate with \`npm run tokens:build\`.
 *
 * Starter design tokens: color, typography, spacing, radius, elevation, and
 * semantic colors as CSS custom properties, light + dark. Matches the scales
 * documented in references/design-system.md.
 *
 * Use this when a target project has no tokens yet. If it already has a
 * design-system.md's equivalent, extend that instead — don't run two
 * parallel token systems in one codebase.
 *
 * Dark mode uses a \`.dark\` class on <html> (the Shadcn/Tailwind convention)
 * plus a \`prefers-color-scheme\` fallback for projects without a JS theme
 * toggle yet. If the target project uses \`[data-theme="dark"]\` instead,
 * swap the selector below — don't add both conventions to one project.
 */

:root {
  /* Typography — modular scale, ratio 1.25, base 16px (1rem). */
${typographyLines(tokens)}

  /* Spacing — 4px base unit. */
${spacingLines(tokens)}

  /* Radius. */
${radiusLines(tokens)}

  /* Elevation — light surfaces: soft, low-opacity black shadows. */
${shadowLines(tokens.shadow.light)}

  /* Base colors. */
${colorLines(tokens.color.light).split("\n").slice(0, 7).join("\n")}

  /* Semantic colors. */
${colorLines(tokens.color.light).split("\n").slice(7).join("\n")}
}

.dark {
  /* Elevation — dark surfaces: black shadows barely read, so lean on a
     slightly opaque black plus a hint of the border color instead of
     scaling the light-mode shadow opacity up. */
${shadowLines(tokens.shadow.dark)}

${colorLines(tokens.color.dark)}
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
${shadowLines(tokens.shadow.dark, "    ")}

${colorLines(tokens.color.dark, "    ")}
  }
}
`;
}
