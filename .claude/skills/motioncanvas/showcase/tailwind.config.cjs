/**
 * Shared across every showcase's "after" side — content globs cover all of
 * showcase/*\/after/, examples/, and snippets/ rather than one showcase at a
 * time, since Tailwind's JIT only emits classes it actually finds
 * referenced; scanning more files than one showcase needs costs nothing and
 * avoids re-editing this file for every new showcase added.
 *
 * theme.extend comes from a transpiled copy of the real
 * snippets/tailwind-theme-extension.ts (see tooling/capture.mjs, which
 * generates .tmp/tailwind-theme-extension.cjs before invoking Tailwind) —
 * not a hand-copied approximation, so this config extends with whatever
 * `npm run tokens:build` actually produces. Dark mode uses the `.dark`
 * class, matching snippets/tokens.css's own convention.
 */
const { tailwindThemeExtension } = require("./.tmp/tailwind-theme-extension.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*/after/**/*.tsx", "../examples/**/*.tsx", "../snippets/**/*.tsx"],
  theme: {
    extend: tailwindThemeExtension,
  },
};
