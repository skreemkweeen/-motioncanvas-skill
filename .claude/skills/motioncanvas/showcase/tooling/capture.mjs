// Real before/after screenshot capture for showcase/landing-page/ — not a
// mockup. Bundles the actual after/App.tsx (which imports the real,
// shipped examples/ai-saas-landing/ components) and baseline/App.tsx with
// esbuild, compiles the after side's real Tailwind utility classes against
// the real generated snippets/tailwind-theme-extension.ts, then screenshots
// both at three real viewport sizes with Playwright.
//
// Isolated on purpose: this script, its dependencies (esbuild, tailwindcss,
// playwright, framer-motion, react/react-dom), and its own package.json
// live entirely under showcase/ — see ../README.md. Run with `npm run
// capture` from this directory. Never wired into the root repo's
// typecheck/lint/CI.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";
import { chromium } from "playwright";

const showcaseDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skillDir = path.dirname(showcaseDir);
const tmpDir = path.join(showcaseDir, ".tmp");
const landingPageDir = path.join(showcaseDir, "landing-page");
const screenshotsDir = path.join(landingPageDir, "screenshots");

// The sandbox's pre-installed Chromium build predates what this Playwright
// version expects by default — launch against it explicitly rather than
// triggering a browser download that isn't available here.
const CHROMIUM_EXECUTABLE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1194 },
  mobile: { width: 390, height: 844 },
};

function ensureDirs() {
  mkdirSync(tmpDir, { recursive: true });
  mkdirSync(screenshotsDir, { recursive: true });
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

/** Compile the real Tailwind config (theme.extend = the transpiled file above) against the real component source. */
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

// after/App.tsx imports real components from examples/ai-saas-landing/,
// which sits outside showcase/'s own directory tree — esbuild's default
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

async function bundleEntry(name) {
  const result = await esbuild.build({
    entryPoints: [path.join(landingPageDir, name, "entry.tsx")],
    outfile: path.join(tmpDir, `${name}.bundle.js`),
    bundle: true,
    format: "iife",
    platform: "browser",
    jsx: "automatic",
    target: "es2020",
    logLevel: "warning",
    alias: SHARED_PACKAGE_ALIASES,
  });
  if (result.errors.length > 0) {
    throw new Error(`esbuild failed for ${name}: ${JSON.stringify(result.errors)}`);
  }
}

function writeHtmlShell(name, { extraCss = "" } = {}) {
  const tokensCss = readFileSync(path.join(skillDir, "snippets", "tokens.css"), "utf8");
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>${tokensCss}</style>
${extraCss ? `<style>${extraCss}</style>` : ""}
<style>* { box-sizing: border-box; } body { margin: 0; }</style>
</head>
<body>
<div id="root"></div>
<script src="./${name}.bundle.js"></script>
</body>
</html>`;
  const outPath = path.join(tmpDir, `${name}.html`);
  writeFileSync(outPath, html, "utf8");
  return outPath;
}

async function screenshotAll(name, htmlPath) {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXECUTABLE });
  try {
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      const context = await browser.newContext({
        viewport,
        reducedMotion: "reduce",
      });
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

      const outPath = path.join(screenshotsDir, `${name}-${viewportName}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`ok: captured ${path.relative(showcaseDir, outPath)}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  ensureDirs();

  await transpileTailwindThemeExtension();
  compileTailwindCss();
  const afterCss = readFileSync(path.join(tmpDir, "after-tailwind.css"), "utf8");

  await bundleEntry("after");
  await bundleEntry("baseline");

  const afterHtml = writeHtmlShell("after", { extraCss: afterCss });
  const baselineHtml = writeHtmlShell("baseline");

  if (!existsSync(afterHtml) || !existsSync(baselineHtml)) {
    throw new Error("HTML shells were not written");
  }

  await screenshotAll("after", afterHtml);
  await screenshotAll("baseline", baselineHtml);

  console.log("\nAll showcase screenshots captured.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
