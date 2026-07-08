# Visual diff: baseline vs. after

Screenshots in `screenshots/` (desktop 1440px, tablet 834px, mobile 390px,
plus one dark-mode desktop capture of the after side — see
`../tooling/capture.mjs`). This file narrates what changed and why, the
same way `../landing-page/VISUAL_DIFF.md` does for the first showcase —
and, deliberately, the opposite set of design instincts in several places,
since a dashboard and a landing page are the sharpest contrast this skill's
`references/intent-taxonomy.md` draws.

## Hierarchy

**Baseline**: a page title, four metric cards, and a table — all roughly
the same visual weight, distinguished only by font-size.

**After**: the same content, but the metrics row reads as a single
glanceable unit (consistent card treatment, aligned baselines), and the
data table's status column is the one place color does real work (drawing
the eye to `degraded`/`down` rows first) rather than color being sprinkled
decoratively elsewhere.

## Spacing

**Baseline**: ad hoc pixel values per element (`16px`, `24px`, `8px 16px`),
no shared scale, a fixed `200px` sidebar regardless of viewport.

**After**: every value traces to `tokens/design-tokens.ts`'s scale via
Tailwind utilities; the sidebar is `w-56` on desktop and a real disclosure
below `md:`, not a fixed pixel box that stops fitting on narrower screens.

## Typography

**Baseline**: two sizes (24px page title, 14px everything else).

**After**: `text-xl`/`text-2xl`/`text-sm` from the shared type scale, plus
`font-mono` specifically for endpoint paths — a real typographic decision
(monospace reads as "this is a literal string, not prose"), not a default.

## Motion

**Baseline**: none.

**After**: `Fade` on the metrics row and the data table's rows — mount-time
transitions only, deliberately not `Reveal`/`StaggerContainer` (those are
scroll-triggered entrances appropriate for a page visited once, not a
dashboard opened dozens of times a day where a replaying entrance
animation would become an annoyance, not polish). See
`examples/analytics-dashboard/README.md` §5 for the full reasoning — the
inverse of the landing page's own motion decisions, not a copy of them.

## Accessibility

**Baseline**: status is color-only (no text distinguishes `healthy` from
anything else beyond hue), no live-region announcements for any state
change, a plain `<div>`-based table-like grid... actually a real `<table>`
here, but with no `<caption>`/`scope` — screen-reader users get "table,
5 rows" with no structural hints about what the columns mean.

**After**: status is color **and** text; the (real, not manufactured for
this showcase) loading/error states carry `aria-live`/`role="alert"`; the
data table has a `<caption>` and `scope="col"` headers; the chart ships a
visually-hidden real `<table>` of its own data, since a bar chart's pixels
carry no information for a screen-reader user and an `aria-label` summary
can't express point-by-point values. See
`examples/analytics-dashboard/README.md` §6.

## Responsiveness

**Baseline**: the sidebar is a fixed `200px` regardless of viewport —
compare `screenshots/baseline-mobile.png`'s cramped, squeezed content
against `screenshots/after-mobile.png`'s real top-bar-with-disclosure
pattern. The metrics grid does reflow (a browser default for the layout
chosen), but nothing else adapts.

**After**: the sidebar collapses to a disclosure below `md:`; the metrics
grid steps 4 → 2 → 1 columns deliberately; the data table scrolls
horizontally on narrow viewports rather than breaking.

## Dark mode

**Baseline**: none — there is no way to toggle it; the page is hardcoded
light.

**After**: real, via the shared `.dark` token mechanism
(`snippets/tokens.css`) — see `screenshots/after-dark-desktop.png`. No
dashboard-specific dark-mode CSS was written; every color in the "after"
side already traces to a semantic token, so toggling the class swapped
all of them at once. This is also the case for `examples/ai-saas-landing/`,
but that example was deliberately built as a single-theme page with one
dark hero island (see its own README's design rationale) — this is the
first showcase to actually exercise the token system's dark-mode path for
a whole page, not just a section.

## Performance

Both sides are light (no images, one small inline SVG chart, no heavy
scripts). The meaningful difference is the chart itself: a hand-rolled,
dependency-free SVG bar chart on the "after" side versus... nothing on the
baseline (a real unguided generation would likely reach for a charting
library at this point, adding a real dependency this showcase's "after"
side deliberately avoids — see `sparkline-chart.tsx`'s own doc comment).

## What building this showcase actually found

One real bug, not manufactured to pad this list (see
`../landing-page/VISUAL_DIFF.md` for the three found building the first
showcase — this one found fewer because that pass already fixed the
recurring category of issue, the Tailwind/token interaction):

- **Tailwind's `bg-{color}/10` opacity modifier silently produced a fully
  transparent background** against this skill's CSS-variable-based color
  tokens (`snippets/tokens.css` defines plain hex strings, not the "R G B"
  triplet format Tailwind's opacity-channel injection needs). The status
  badges initially rendered as unfilled colored text with no visible pill
  background at all — caught by inspecting the actual computed style, not
  just eyeballing the screenshot (the visual symptom was subtle enough to
  almost miss). Fixed with `color-mix(in srgb, var(--color-success) 12%,
transparent)` via inline `style`, which operates on the resolved CSS
  variable directly rather than depending on Tailwind's opacity-modifier
  mechanism at all. See `examples/analytics-dashboard/data-table.tsx`'s own
  comment — and note this is a real gotcha for anyone building on this
  skill's token system: opacity modifiers on semantic color utilities
  (`bg-primary/10`, `text-success/50`, etc.) don't work here; use
  `color-mix()` against the CSS variable instead.
