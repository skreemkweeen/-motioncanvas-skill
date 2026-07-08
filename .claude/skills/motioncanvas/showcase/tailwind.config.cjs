/**
 * The "after" side's Tailwind config. theme.extend comes from a transpiled
 * copy of the real snippets/tailwind-theme-extension.ts (see
 * tooling/capture.mjs, which generates .tmp/tailwind-theme-extension.cjs
 * before invoking Tailwind) — not a hand-copied approximation, so this
 * config extends with whatever `npm run tokens:build` actually produces.
 */
const { tailwindThemeExtension } = require("./.tmp/tailwind-theme-extension.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./landing-page/after/**/*.tsx",
    "../examples/ai-saas-landing/**/*.tsx",
    "../snippets/motion/**/*.tsx",
    "../snippets/*.tsx",
  ],
  theme: {
    extend: tailwindThemeExtension,
  },
};
