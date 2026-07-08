/**
 * The single source of truth for this skill's design tokens. Every other
 * token artifact (snippets/tokens.css, tokens.json, tokens.d.ts,
 * tailwind-theme-extension.ts) is generated FROM this file by the compilers
 * in this directory — edit here, then run `npm run tokens:build`, never
 * hand-edit a generated file directly.
 *
 * Values match references/design-system.md's documented scales.
 */

export interface TypographyToken {
  fontSize: string;
  lineHeight: number;
}

export type TypographyScale = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type SpacingScale = "1" | "2" | "3" | "4" | "6" | "8" | "12" | "16" | "24" | "32";
export type RadiusScale = "sm" | "md" | "lg" | "xl" | "full";
export type ShadowScale = "sm" | "md" | "lg" | "xl";

export interface ColorTokens {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface DesignTokens {
  typography: Record<TypographyScale, TypographyToken>;
  spacing: Record<SpacingScale, string>;
  radius: Record<RadiusScale, string>;
  shadow: {
    light: Record<ShadowScale, string>;
    dark: Record<ShadowScale, string>;
  };
  color: {
    light: ColorTokens;
    dark: ColorTokens;
  };
}

export const designTokens: DesignTokens = {
  typography: {
    xs: { fontSize: "0.8rem", lineHeight: 1.5 },
    sm: { fontSize: "0.875rem", lineHeight: 1.5 },
    base: { fontSize: "1rem", lineHeight: 1.6 },
    lg: { fontSize: "1.25rem", lineHeight: 1.4 },
    xl: { fontSize: "1.563rem", lineHeight: 1.3 },
    "2xl": { fontSize: "1.953rem", lineHeight: 1.2 },
    "3xl": { fontSize: "2.441rem", lineHeight: 1.15 },
    "4xl": { fontSize: "3.052rem", lineHeight: 1.05 },
  },
  spacing: {
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "6": "1.5rem",
    "8": "2rem",
    "12": "3rem",
    "16": "4rem",
    "24": "6rem",
    "32": "8rem",
  },
  radius: {
    sm: "0.375rem",
    md: "0.625rem",
    lg: "0.875rem",
    xl: "1.25rem",
    full: "9999px",
  },
  shadow: {
    light: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 8px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
      lg: "0 12px 24px -4px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.06)",
      xl: "0 24px 48px -8px rgb(0 0 0 / 0.14), 0 8px 16px -8px rgb(0 0 0 / 0.08)",
    },
    dark: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
      md: "0 4px 8px -2px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
      lg: "0 12px 24px -4px rgb(0 0 0 / 0.45), 0 4px 8px -4px rgb(0 0 0 / 0.3)",
      xl: "0 24px 48px -8px rgb(0 0 0 / 0.55), 0 8px 16px -8px rgb(0 0 0 / 0.35)",
    },
  },
  color: {
    light: {
      background: "#ffffff",
      foreground: "#0a0a0a",
      muted: "#f4f4f5",
      mutedForeground: "#71717a",
      border: "#e4e4e7",
      card: "#ffffff",
      cardForeground: "#0a0a0a",
      primary: "#4f46e5",
      primaryForeground: "#ffffff",
      destructive: "#dc2626",
      destructiveForeground: "#ffffff",
      success: "#16a34a",
      successForeground: "#ffffff",
      warning: "#d97706",
      warningForeground: "#ffffff",
    },
    dark: {
      background: "#0a0a0a",
      foreground: "#fafafa",
      muted: "#18181b",
      mutedForeground: "#a1a1aa",
      border: "#27272a",
      card: "#111113",
      cardForeground: "#fafafa",
      primary: "#818cf8",
      primaryForeground: "#0a0a0a",
      destructive: "#f87171",
      destructiveForeground: "#0a0a0a",
      success: "#4ade80",
      successForeground: "#0a0a0a",
      warning: "#fbbf24",
      warningForeground: "#0a0a0a",
    },
  },
};
