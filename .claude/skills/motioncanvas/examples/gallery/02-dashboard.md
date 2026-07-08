# Walkthrough: dashboard

> **This scenario has a full, real reference build now**: `examples/analytics-dashboard/`
> (an internal API dashboard called "Pulse") and its before/after screenshots in
> `showcase/dashboard/`. The walkthrough below is kept as the original
> planning-trace reasoning for a generic dashboard request — read
> `examples/analytics-dashboard/README.md` for the actual, fully-worked
> decisions (design rationale, tokens, motion, accessibility, performance)
> behind a specific implementation.

## Prompt

> "We need a dashboard showing our SaaS's usage metrics — active users,
> API calls, error rate — with a date range filter. Internal tool, used daily
> by our own team."

## Expected workflow

1. **Intent + requirements** — matches `references/intent-taxonomy.md`'s
   `dashboard` category directly: "returning, trained user who values speed
   and information density over persuasion." No creative brief needed beyond
   the taxonomy defaults for a request this concretely scoped — `SKILL.md`'s
   own rule against over-planning a well-specified ask applies.
2. **Research** — critical here specifically: read the target repo's
   existing data-fetching pattern (React Query? Server Components with
   direct fetches?), table/chart library if one's installed, and loading/
   error-state conventions already in use — `analysis/README.md` maps each
   of these to a concrete tool call. A dashboard is the category most likely
   to already have strong existing conventions worth matching exactly.
3. **Planning + layout** — persistent nav, metrics summary row, one primary
   chart, a date-range control — per the taxonomy's `dashboard` entry.
   Explicit empty/loading/error states for the metrics row and chart, not
   deferred.
4. **Design system** — reuse existing tokens; dense grid-based layout per
   the taxonomy's layout strategy, no hero section.
5. **Components** — existing repo components first; a metrics-card and a
   chart wrapper if none exist, sourced from Shadcn/Radix before anything
   custom.
6. **Motion** — `enterprise` preset (`snippets/motion/presets.ts`): `Fade`
   only, on data refresh, skeleton loading states over spinners where
   plausible. No `AuroraBackground`/`CursorGlow`/`FloatingCard` — the
   taxonomy entry says so explicitly, and the `enterprise` preset's
   `interactionNotes` say the same independently.
7. **Accessibility + performance + review** — same seven-lens pipeline;
   particular attention to whether the chart library's own accessibility
   story is adequate (many chart libraries need supplementary
   table/summary text for screen readers) — a dashboard-specific check the
   generic checklist doesn't call out by name but the Accessibility Auditor
   lens in `references/review-pipeline.md` would raise.
8. **Code + documentation** — the dashboard route/components; flag (not
   silently add) any new charting dependency, per `SKILL.md`'s Output
   expectations for a new page/feature.

## Generated artifacts

- `metrics-summary.tsx`, a chart wrapper component, a `date-range-picker`
  (existing repo/Shadcn primitive if available), composed into a dashboard
  route.
- `Fade` from `snippets/motion/` on data refresh; explicit skeleton
  components for the loading state rather than a spinner.

## Explanation

The dashboard category is the clearest case in this skill's taxonomy for
"more motion is not more polish" — `references/motion-principles.md`'s "when
not to animate" applies directly, and the taxonomy entry frames near-zero
motion here as the correct choice, not a compromise. The bigger risk on a
request like this is skipping repo intelligence because the ask sounds
simple ("just a dashboard") — three metrics and a chart still need to match
whatever data-fetching and loading-state pattern the rest of the app already
uses, or the result reads as bolted-on rather than native to the codebase.
