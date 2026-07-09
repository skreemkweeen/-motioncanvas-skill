#!/usr/bin/env node
// Regression check: every motion primitive in snippets/motion/ that renders
// a literal SSR-computed hidden starting style (an `opacity: 0` in an
// `initial`/`variants` object) must also mark its element
// `data-motion-reveal`, or it silently reintroduces the bug `no-js.css`
// exists to fix — content that stays invisible forever when JavaScript
// never runs. This is a heuristic text scan, not a real AST check: it
// catches the common case (a new primitive copy-pasting an `opacity: 0`
// pattern without the marker), not MotionValue-driven starting states like
// `ScrollReveal`'s (see that file's own doc comment) — those need a human
// to notice.

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const motionDir = fileURLToPath(
  new URL("../.claude/skills/motioncanvas/snippets/motion/", import.meta.url),
);

// Negative lookahead excludes `opacity: 0.5` (a fractional value, e.g. a
// decorative overlay's steady-state opacity) — only a literal all-hidden 0.
const HIDDEN_STYLE_PATTERN = /opacity\s*:\s*0(?![.\d])/;
const MARKER = "data-motion-reveal";
const SKIP_FILES = new Set(["no-js-guard.tsx", "tokens.ts", "index.ts"]);

let failed = false;

for (const entry of readdirSync(motionDir)) {
  if (!entry.endsWith(".tsx") || SKIP_FILES.has(entry)) continue;

  const contents = readFileSync(path.join(motionDir, entry), "utf8");

  if (HIDDEN_STYLE_PATTERN.test(contents) && !contents.includes(MARKER)) {
    console.error(
      `✖ ${entry}: renders an "opacity: 0" starting state without the ${MARKER} marker — ` +
        "without it, this content stays invisible forever when JavaScript never runs " +
        "(see snippets/motion/no-js.css).",
    );
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  "✓ every motion primitive with a literal hidden starting state marks data-motion-reveal",
);
