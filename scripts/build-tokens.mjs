// Regenerates snippets/tokens.css, tokens.json, design-tokens.ts, and
// tailwind-theme-extension.ts from tokens/design-tokens.ts — see
// tokens/build.ts for what it actually writes.
import { execFileSync } from "node:child_process";
import path from "node:path";
import { buildTools } from "./build-tools.mjs";

const outDir = buildTools();
const entry = path.join(outDir, "tokens", "build.js");
execFileSync("node", [entry], { stdio: "inherit" });

// tokens/build.ts writes raw template strings, not Prettier-formatted
// output — run Prettier on just the files it touched so the generated
// snippets match this repo's own formatting convention (and `npm run
// format`'s check).
const generatedFiles = [
  ".claude/skills/motioncanvas/snippets/tokens.css",
  ".claude/skills/motioncanvas/snippets/tokens.json",
  ".claude/skills/motioncanvas/snippets/design-tokens.ts",
  ".claude/skills/motioncanvas/snippets/tailwind-theme-extension.ts",
];
execFileSync("npx", ["prettier", "--write", ...generatedFiles], { stdio: "inherit" });
