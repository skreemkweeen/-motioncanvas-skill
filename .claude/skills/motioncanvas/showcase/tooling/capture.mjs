// Real before/after screenshot capture for showcase/<name>/ — not a mockup.
// Bundles the actual after/entry.tsx (which imports real, shipped
// examples/ components) and baseline/entry.tsx with esbuild, compiles the
// after side's real Tailwind utility classes against the real generated
// snippets/tailwind-theme-extension.ts, then screenshots both at three real
// viewport sizes with Playwright, plus one dark-mode desktop capture of the
// after side.
//
// Isolated on purpose: this script, its dependencies (esbuild, tailwindcss,
// playwright, framer-motion, react/react-dom), and its own package.json
// live entirely under showcase/ — see ../README.md. Run with `npm run
// capture` (all showcases) or `npm run capture -- <name>` (one showcase)
// from this directory. Never wired into the root repo's typecheck/lint/CI.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";
import { chromium } from "playwright";

const showcaseDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skillDir = path.dirname(showcaseDir);
const tmpDir = path.join(showcaseDir, ".tmp");

// The sandbox's pre-installed Chromium build predates what this Playwright
// version expects by default — launch against it explicitly rather than
// triggering a browser download that isn't available here.
const CHROMIUM_EXECUTABLE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1194 },
  mobile: { width: 390, height: 844 },
};

// Showcases whose "after" side actually declares dark-mode support (see its
// own README) — not every showcase does; examples/ai-saas-landing/ is a
// deliberately single-theme page with one dark hero island, not a
// dark-mode-toggleable design, so forcing `.dark` on it would produce a
// misleading screenshot (unstyled dark-on-dark text) rather than a real
// finding. Add a showcase's name here only when its "after" component was
// actually built to support both themes.
const DARK_MODE_SHOWCASES = new Set(["dashboard"]);

/** Any showcase/<name>/ with both an after/ and baseline/ entry point. */
function discoverShowcases() {
  return readdirSync(showcaseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter(
      (name) =>
        existsSync(path.join(showcaseDir, name, "after", "entry.tsx")) &&
        existsSync(path.join(showcaseDir, name, "baseline", "entry.tsx")),
    );
}

/** Transpile the real tailwind-theme-extension.ts to CJS so tailwind.config.cjs can require() it. */
async function transpileTailwindThemeExtension() {
  await esbuild.build({
    entryPoints: [path.join(skillDir, "snippets", "tailwind-theme-extension.ts")],
    outfile: path.join(tmpDir, "tailwind-theme-extension.cjs"),
    bundle: false,
    format: "cjs",
    platform: "node",
    target: "node18",
  });
}

/** Compile the shared Tailwind config (content globs cover every showcase's after/ + all of examples/snippets) once. */
function compileTailwindCss() {
  const bin = path.join(showcaseDir, "node_modules", ".bin", "tailwindcss");
  execFileSync(
    bin,
    [
      "-c",
      path.join(showcaseDir, "tailwind.config.cjs"),
      "-i",
      path.join(showcaseDir, "tooling", "tailwind-input.css"),
      "-o",
      path.join(tmpDir, "after-tailwind.css"),
      "--minify",
    ],
    { stdio: "inherit", cwd: showcaseDir },
  );
}

// A showcase's after/ side imports real components from examples/, which
// sits outside showcase/'s own directory tree — esbuild's default
// node-style resolution would walk up *their* location and find the repo
// root's own node_modules/react instead of showcase/'s copy, bundling two
// separate React instances (the classic "invalid hook call" bug). Alias
// every cross-boundary package to showcase's own resolved copy so there's
// exactly one instance regardless of which file imports it.
const SHARED_PACKAGE_ALIASES = {
  react: path.join(showcaseDir, "node_modules", "react", "index.js"),
  "react/jsx-runtime": path.join(showcaseDir, "node_modules", "react", "jsx-runtime.js"),
  "react-dom": path.join(showcaseDir, "node_modules", "react-dom", "index.js"),
  "react-dom/client": path.join(showcaseDir, "node_modules", "react-dom", "client.js"),
  "framer-motion": path.join(
    showcaseDir,
    "node_modules",
    "framer-motion",
    "dist",
    "cjs",
    "index.js",
  ),
};

async function bundleEntry(showcaseName, side) {
  const result = await esbuild.build({
    entryPoints: [path.join(showcaseDir, showcaseName, side, "entry.tsx")],
    outfile: path.join(tmpDir, `${side}.bundle.js`),
    bundle: true,
    format: "iife",
    platform: "browser",
    jsx: "automatic",
    target: "es2020",
    logLevel: "warning",
    alias: SHARED_PACKAGE_ALIASES,
  });
  if (result.errors.length > 0) {
    throw new Error(
      `esbuild failed for ${showcaseName}/${side}: ${JSON.stringify(result.errors)}`,
    );
  }
}

function writeHtmlShell(side, { extraCss = "", dark = false } = {}) {
  const tokensCss = readFileSync(path.join(skillDir, "snippets", "tokens.css"), "utf8");
  const html = `<!doctype html>
<html${dark ? ' class="dark"' : ""}>
<head>
<meta charset="utf-8" />
<style>${tokensCss}</style>
${extraCss ? `<style>${extraCss}</style>` : ""}
<style>* { box-sizing: border-box; } body { margin: 0; background: var(--color-background); }</style>
</head>
<body>
<div id="root"></div>
<script src="./${side}.bundle.js"></script>
</body>
</html>`;
  const outPath = path.join(tmpDir, `${side}${dark ? "-dark" : ""}.html`);
  writeFileSync(outPath, html, "utf8");
  return outPath;
}

async function screenshotVariant(screenshotsDir, outNamePrefix, htmlPath, viewports) {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXECUTABLE });
  try {
    for (const [viewportName, viewport] of Object.entries(viewports)) {
      const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(`file://${htmlPath}`);
      await page.waitForLoadState("networkidle");

      // Reveal/StaggerContainer/etc. animate `whileInView` (real
      // IntersectionObserver-driven entrance), starting at opacity: 0 until
      // triggered. A single instantaneous scrollTo(bottom) jump can skip an
      // element that only ever intersects the viewport *during* the scroll
      // path (e.g. something in the middle of a page taller than one
      // viewport on mobile) — Chromium never paints the intermediate scroll
      // positions, so its IntersectionObserver never fires for that element
      // and it stays stuck at opacity: 0 forever. Step down in increments
      // smaller than one viewport height (with overlap) so every element
      // actually passes through an intersecting position, pausing at each
      // step for the observer to fire and the transition to finish, then
      // scroll back to the top before capturing.
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const step = Math.max(Math.round(viewport.height * 0.75), 1);
      for (let y = 0; y <= scrollHeight; y += step) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(250);
      }
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(150);

      const outPath = path.join(screenshotsDir, `${outNamePrefix}-${viewportName}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`ok: captured ${path.relative(showcaseDir, outPath)}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

async function captureShowcase(showcaseName, afterCss) {
  console.log(`\n=== ${showcaseName} ===`);
  const screenshotsDir = path.join(showcaseDir, showcaseName, "screenshots");
  mkdirSync(screenshotsDir, { recursive: true });

  await bundleEntry(showcaseName, "after");
  await bundleEntry(showcaseName, "baseline");

  const afterHtml = writeHtmlShell("after", { extraCss: afterCss });
  const baselineHtml = writeHtmlShell("baseline");

  if (!existsSync(afterHtml) || !existsSync(baselineHtml)) {
    throw new Error(`HTML shells were not written for ${showcaseName}`);
  }

  await screenshotVariant(screenshotsDir, "after", afterHtml, VIEWPORTS);
  await screenshotVariant(screenshotsDir, "baseline", baselineHtml, VIEWPORTS);

  if (DARK_MODE_SHOWCASES.has(showcaseName)) {
    const afterDarkHtml = writeHtmlShell("after", { extraCss: afterCss, dark: true });
    if (!existsSync(afterDarkHtml)) {
      throw new Error(`Dark-mode HTML shell was not written for ${showcaseName}`);
    }
    // One desktop capture of the after side only — the baseline has no
    // dark-mode support by design (see its own showcase README), and three
    // more viewports per showcase would be a lot of near-duplicate images
    // for what this capture is meant to prove (the token mechanism works),
    // not a full responsive dark-mode audit.
    await screenshotVariant(screenshotsDir, "after-dark", afterDarkHtml, {
      desktop: VIEWPORTS.desktop,
    });
  }
}

async function main() {
  mkdirSync(tmpDir, { recursive: true });

  await transpileTailwindThemeExtension();
  compileTailwindCss();
  const afterCss = readFileSync(path.join(tmpDir, "after-tailwind.css"), "utf8");

  const requested = process.argv[2];
  const showcases = requested ? [requested] : discoverShowcases();
  if (showcases.length === 0) {
    throw new Error(
      "No showcases found — expected at least one showcase/<name>/{after,baseline}/entry.tsx",
    );
  }

  for (const name of showcases) {
    await captureShowcase(name, afterCss);
  }

  console.log("\nAll showcase screenshots captured.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
