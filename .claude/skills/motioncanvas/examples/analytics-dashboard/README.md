# Reference workflow: Pulse analytics dashboard

A second complete example built through the full `SKILL.md` workflow, for
"Pulse" (fictional) — the internal API usage/reliability dashboard for the
same "Fieldnote" product `examples/ai-saas-landing/` builds a marketing
page for. Deliberately the sharpest contrast to that example: a dense,
low-motion, dark-mode-first internal tool instead of a persuasive
marketing page, following `references/intent-taxonomy.md`'s `dashboard`
category defaults rather than `landing-page`'s.

## 1. Requirements analysis

- **Audience**: engineers on the Fieldnote team monitoring their own API —
  a returning, trained user who values speed and information density over
  persuasion, per the `dashboard` category's own framing.
- **Core goal**: answer "is anything broken, and where" in the first five
  seconds on the page, then let filtering/drilling down happen naturally.
- **Constraints**: same stack as `examples/ai-saas-landing/` (Tailwind,
  Framer Motion only), but real dark-mode support this time — an internal
  tool used for hours at a stretch is exactly the case dark mode exists
  for, unlike the marketing page's single light-themed hero moment.

## 2. Design rationale

Target quality bar: Linear/Vercel/Stripe Dashboard/Raycast — restrained,
information-dense, confident in negative space rather than filling it.
Concretely: one accent color (`--color-primary`) used sparingly (the
active nav item, the chart bars, focus rings), status communicated by
color **and** text (never color alone — see Accessibility below), and
close to zero decorative motion. This is the opposite design instinct from
the landing page's one deliberate hero moment; here, the "premium" feel
comes from restraint and density done well, not from a moment of spectacle.

Explicitly **not used**: `AuroraBackground`, `CursorGlow`, `FloatingCard`,
`HeroReveal`, `Reveal`, `StaggerContainer` — none of this page's content is
a one-time entrance a visitor scrolls through once; it's a dashboard a
user returns to daily, where scroll-triggered reveal animations would
replay distractingly on every visit and ambient motion would read as
noise, per `references/intent-taxonomy.md`'s `dashboard` notes and the
`enterprise`/`minimal` presets' own interaction notes.

## 3. Layout planning

- **Structure**: persistent sidebar nav (icon + label, collapses to a
  disclosure below `md:`) + main content area — no hero, matching the
  `dashboard` category's layout strategy exactly.
- **Content order**: metrics summary row (glanceable) → data table +
  chart (drill-down) — highest information-density-per-pixel content
  first, not a narrative scroll.
- **States**: every data region (`DataTable`) supports `loading`/`empty`/
  `error`/`data` explicitly as a required prop, not an afterthought — the
  `dashboard` category's core features list calls this out by name.
- **Responsive**: metrics grid steps 4 → 2 → 1 columns; the data table
  scrolls horizontally on narrow viewports (a real, common accessible
  pattern) rather than breaking its layout or hiding columns silently.

## 4. Design tokens

Every color in this build is a semantic token from `tokens/design-tokens.ts`
(via the real generated `snippets/tailwind-theme-extension.ts` — see
`showcase/dashboard/`'s capture pipeline for how that's compiled and
verified), not a hardcoded hex value: `bg-background`/`text-foreground` for
the page, `bg-card`/`text-card-foreground` for every panel,
`text-muted-foreground` for secondary text, `text-success`/`text-warning`/
`text-destructive` for status. This is also what makes real dark mode
free: toggling the `.dark` class swaps every one of those tokens at once
(`snippets/tokens.css`'s mechanism), no dashboard-specific dark-mode CSS
needed.

## 5. Motion decisions

| Where               | Primitive | Why                                                                                                                                                                                                               |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Metrics summary row | `Fade`    | A mount-time transition (not scroll-triggered) for the one glanceable region that changes on every page load/data refresh — matches the `enterprise` preset's "prefer Fade over Slide/Reveal wherever plausible." |
| Data table rows     | `Fade`    | Same rationale, applied to the drill-down region.                                                                                                                                                                 |
| Chart               | none      | A static SVG — animating bars in on every visit would be exactly the "ambient motion reads as noise" failure mode `references/intent-taxonomy.md` warns against for this category.                                |
| Sidebar/nav/filters | none      | Instant state changes — an operator switching filters repeatedly should never wait on a transition.                                                                                                               |

## 6. Accessibility review

Against `references/quality-checklist.md`:

- **Color independence**: every status badge (`healthy`/`degraded`/`down`)
  carries its own text label, not just a color — and every metric's
  up/down indicator has a visually-hidden "increase"/"decrease" label so a
  screen-reader user gets the same information a sighted user reads from
  the arrow icon and color.
- **Charts**: `SparklineChart` ships a real, visually-hidden `<table>` of
  the same data the SVG bars represent — an `aria-label` summary can't
  express point-by-point values, so this skill doesn't pretend one can.
- **Loading/error announcements**: the loading state's container is
  `aria-live="polite" aria-busy="true"`; the error state is `role="alert"`
  — both are announced to assistive tech without the user needing to
  discover them by scanning.
- **Keyboard/focus**: every interactive element (nav links, filter
  buttons, search input, retry button) has a visible `focus-visible` ring
  against the primary token; the mobile nav disclosure has real
  `aria-expanded`/`aria-controls`, matching `examples/ai-saas-landing/nav.tsx`'s
  pattern.
- **Semantic structure**: a real `<table>` with `<caption>` and
  `scope="col"` headers for the endpoint data — not a grid of `<div>`s
  styled to look like a table.
- **Found while building this**: Tailwind's `bg-{color}/10` opacity
  modifier silently produces a fully transparent background against these
  CSS-variable-based tokens (they're plain hex strings, not the "R G B"
  triplet format the modifier needs an alpha channel to inject into) — the
  status badges initially rendered as unfilled colored text with no pill
  background at all. Fixed with `color-mix(in srgb, var(--color-success)
12%, transparent)` via inline `style`, which operates on the resolved
  variable directly. See `data-table.tsx`'s own comment.
- Not yet verified: real contrast measurement of the status badges'
  `color-mix()` tint against both light and dark surfaces — flagging this
  rather than asserting an unearned pass, same as
  `examples/ai-saas-landing/README.md`'s own §6.

## 7. Performance considerations

- The chart is a hand-rolled inline SVG, not a charting library — no new
  dependency, no client bundle cost beyond what's already needed for the
  rest of the page. See `sparkline-chart.tsx`'s own doc comment for why a
  real charting library is a target-project decision this skill shouldn't
  make on a project's behalf.
- `Sidebar`, `FilterBar`, and `DataTable`'s retry handler need `useState`,
  so those three are Client Components; `Topbar`, `MetricsSummary`,
  `MetricCard`, and `SparklineChart` render no client-only state and stay
  server-rendered, following the same boundary discipline as
  `examples/ai-saas-landing/README.md` §7.
- Skeleton loading rows (`animate-pulse`, a pure CSS animation) are used
  instead of a spinner — per the `dashboard` category's own note, and
  cheaper than a JS-driven spinner component.

## 8. Final implementation

- `sidebar.tsx`, `topbar.tsx`, `filter-bar.tsx` — the persistent chrome.
- `metrics-summary.tsx`/`metric-card.tsx` — the glanceable summary row.
- `data-table.tsx` — the drill-down region, with all four required states.
- `sparkline-chart.tsx` — the dependency-free chart.
- `page.tsx` — composes them under one `MotionProvider`.

Typechecked together with the rest of the skill's snippets (React 18 +
Framer Motion 11, strict mode) — see the repo's `package.json`/`tsconfig.json`.

## 9. Showcase checklist

- **Design system** — every color traces to `tokens/design-tokens.ts`;
  verified by the fact this page needs zero dashboard-specific CSS beyond
  Tailwind utilities against the generated theme (§4).
- **Reusable components** — `MetricCard`, `DataTable`, and
  `SparklineChart` are each self-contained, prop-driven, and usable outside
  this specific dashboard (§8).
- **Restrained, purposeful motion** — every animation (or deliberate
  absence of one) traces to a specific reason in §5, inverted from the
  landing page's own reasoning rather than copying it by default.
- **Accessibility** — a full pass in §6, including a real data table
  backing the chart and live-region announcements for loading/error states.
- **Responsive behavior** — the sidebar's disclosure pattern and the
  metrics grid's breakpoint steps are specified in §3.
- **Dark mode** — real, via the shared token mechanism, not a
  dashboard-specific reimplementation (§4); see `showcase/dashboard/` for
  a captured screenshot proving it.
- **Documentation** — this file: requirements through implementation, with
  what's deliberately different from the landing page's own reasoning and
  why, not just a restatement of the same points.
