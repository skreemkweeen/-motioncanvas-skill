/**
 * Regenerates every derived token artifact from design-tokens.ts and writes
 * them into snippets/ (the real source tree, not a build-output directory —
 * these files are committed, since target projects copy snippets/ directly
 * without running this compiler themselves). Run via `npm run tokens:build`.
 */

import { writeFileSync } from "node:fs";
import path from "node:path";
import { designTokens } from "./design-tokens.js";
import { compileToCss } from "./compile-css.js";
import { compileToTailwindTheme } from "./compile-tailwind.js";
import { compileToTypeDeclarations } from "./compile-types.js";
import { compileToJson } from "./compile-json.js";

const skillRoot = path.join(process.cwd(), ".claude/skills/motioncanvas");
const snippetsDir = path.join(skillRoot, "snippets");

writeFileSync(path.join(snippetsDir, "tokens.css"), compileToCss(designTokens));
writeFileSync(path.join(snippetsDir, "tokens.json"), compileToJson(designTokens));
writeFileSync(
  path.join(snippetsDir, "design-tokens.ts"),
  compileToTypeDeclarations(designTokens),
);

const tailwindTheme = compileToTailwindTheme(designTokens);
const tailwindModule = `/**
 * GENERATED FILE — do not edit directly.
 * Source of truth: tokens/design-tokens.ts. Regenerate with \`npm run tokens:build\`.
 *
 * Spread into a target project's tailwind.config theme.extend:
 *
 *   import { tailwindThemeExtension } from "./tailwind-theme-extension";
 *   export default { theme: { extend: tailwindThemeExtension } };
 */

export const tailwindThemeExtension = ${JSON.stringify(tailwindTheme, null, 2)} as const;
`;
writeFileSync(path.join(snippetsDir, "tailwind-theme-extension.ts"), tailwindModule);

console.log(
  "Wrote snippets/tokens.css, tokens.json, design-tokens.ts, and tailwind-theme-extension.ts",
);
