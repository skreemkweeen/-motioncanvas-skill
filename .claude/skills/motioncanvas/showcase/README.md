# Showcase

A real before/after screenshot pipeline, added per `references/roadmap.md`'s
"output quality, not more architecture" phase. Complements
`examples/gallery/`'s narrated (code-only) walkthroughs with actual rendered
images at desktop/tablet/mobile breakpoints — for when seeing the difference
matters more than reading about it.

## Isolation

This directory is a fully separate npm package (its own `package.json`,
`tsconfig.json`, `node_modules`) — **never** a dependency of the root repo's
`typecheck`/`lint`/`format`/`plugins:smoke`/`validate:registry`/`tokens:build`
or its CI workflow. Root `eslint.config.js` explicitly ignores it. If a
change here breaks, it breaks `npm run capture` inside this directory only —
it cannot break the core skill's own verification.

Why isolated instead of reusing root tooling: capturing real screenshots
needs a browser (Playwright), a bundler (esbuild), and a CSS build
(Tailwind) — real dependencies with real weight, appropriate for producing
visual proof but not appropriate to force on every contributor who just
wants to typecheck a snippet. Screenshot generation is optional, on-demand
tooling; the core skill is not.

## What's real here

- The "after" side of each showcase imports the actual shipped components
  from `examples/` directly — not a re-derivation. If those components
  change, the screenshots go stale until `npm run capture` is re-run (they
  are not regenerated automatically; there's no CI hook for this, on
  purpose — see Isolation above).
- The Tailwind CSS compiled for the "after" side uses the real, generated
  `snippets/tailwind-theme-extension.ts` (via `tooling/capture.mjs`
  transpiling it at capture time) — not a hand-copied approximation.
- Screenshots are real Playwright captures against the repo's pre-installed
  Chromium, not mockups or hand-drawn comparisons.

## Running it

```
cd showcase
npm install
npm run capture              # every showcase
npm run capture -- dashboard # one showcase, by directory name
```

Regenerates every `*/screenshots/*.png` under this directory (or just the
named showcase's). Commit the resulting PNGs alongside any change to the
components a showcase covers.

## Showcases

See [`INDEX.md`](INDEX.md) for the status checklist (done vs. planned) with
embedded before/after screenshots, prompts, and links to source for each
completed showcase — the "portfolio" view. Short version:

- [`landing-page/`](landing-page/README.md) — the AI SaaS landing page from
  `examples/ai-saas-landing/` vs. a plausible default/unguided generation of
  the same request.
- [`dashboard/`](dashboard/README.md) — the internal analytics dashboard
  from `examples/analytics-dashboard/` vs. a plausible default generation —
  the sharpest contrast to `landing-page/`: dense, low-motion, dark-mode-
  first instead of persuasive and single-theme.

More will be added incrementally, one at a time with real captured
screenshots each — see `references/roadmap.md`'s output-quality priority
list. Building many at once without capturing and reviewing each for real
is exactly the kind of rushed, shallow output this skill has avoided
throughout its history; real, previously-unnoticed bugs were found and
fixed while building each of the two showcases that exist today (three in
`landing-page/`, one in `dashboard/` — see each one's own `VISUAL_DIFF.md`)
— that's the value of actually rendering the screenshot rather than
assuming the code is correct because it typechecks.
