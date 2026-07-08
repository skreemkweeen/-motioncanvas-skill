/**
 * GENERATED FILE — do not edit directly.
 * Source of truth: tokens/design-tokens.ts. Regenerate with `npm run tokens:build`.
 *
 * Spread into a target project's tailwind.config theme.extend:
 *
 *   import { tailwindThemeExtension } from "./tailwind-theme-extension";
 *   export default { theme: { extend: tailwindThemeExtension } };
 */

export const tailwindThemeExtension = {
  colors: {
    background: "var(--color-background)",
    foreground: "var(--color-foreground)",
    muted: "var(--color-muted)",
    "muted-foreground": "var(--color-muted-foreground)",
    border: "var(--color-border)",
    card: "var(--color-card)",
    "card-foreground": "var(--color-card-foreground)",
    primary: "var(--color-primary)",
    "primary-foreground": "var(--color-primary-foreground)",
    destructive: "var(--color-destructive)",
    "destructive-foreground": "var(--color-destructive-foreground)",
    success: "var(--color-success)",
    "success-foreground": "var(--color-success-foreground)",
    warning: "var(--color-warning)",
    "warning-foreground": "var(--color-warning-foreground)",
  },
  spacing: {
    "1": "var(--space-1)",
    "2": "var(--space-2)",
    "3": "var(--space-3)",
    "4": "var(--space-4)",
    "6": "var(--space-6)",
    "8": "var(--space-8)",
    "12": "var(--space-12)",
    "16": "var(--space-16)",
    "24": "var(--space-24)",
    "32": "var(--space-32)",
  },
  borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    full: "var(--radius-full)",
  },
  boxShadow: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    xl: "var(--shadow-xl)",
  },
  fontSize: {
    xs: [
      "var(--font-size-xs)",
      {
        lineHeight: "var(--line-height-xs)",
      },
    ],
    sm: [
      "var(--font-size-sm)",
      {
        lineHeight: "var(--line-height-sm)",
      },
    ],
    base: [
      "var(--font-size-base)",
      {
        lineHeight: "var(--line-height-base)",
      },
    ],
    lg: [
      "var(--font-size-lg)",
      {
        lineHeight: "var(--line-height-lg)",
      },
    ],
    xl: [
      "var(--font-size-xl)",
      {
        lineHeight: "var(--line-height-xl)",
      },
    ],
    "2xl": [
      "var(--font-size-2xl)",
      {
        lineHeight: "var(--line-height-2xl)",
      },
    ],
    "3xl": [
      "var(--font-size-3xl)",
      {
        lineHeight: "var(--line-height-3xl)",
      },
    ],
    "4xl": [
      "var(--font-size-4xl)",
      {
        lineHeight: "var(--line-height-4xl)",
      },
    ],
  },
} as const;
