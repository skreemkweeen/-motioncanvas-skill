# Showcase: analytics dashboard

## 1. Prompt

See [`prompt.md`](prompt.md).

## 2. Baseline implementation

[`baseline/App.tsx`](baseline/App.tsx) — a plausible default/unguided
generation for the same prompt: inline styles, a fixed-width sidebar with
no responsive treatment, color-only status indicators, no dark mode, no
loading/empty/error states (just the happy path). Same genuinely common
defaults pattern as `../landing-page/baseline/App.tsx`, applied to a very
different UI shape.

## 3. MotionCanvas implementation

[`after/App.tsx`](after/App.tsx) — imports the real `Sidebar`, `Topbar`,
`FilterBar`, `MetricsSummary`, `SparklineChart`, and `DataTable` from
`examples/analytics-dashboard/` directly, the same pattern
`../landing-page/after/App.tsx` uses for the first showcase. If those
components change, this showcase's screenshots reflect that the next time
`npm run capture` runs.

## 4. Screenshots

`screenshots/{baseline,after}-{desktop,tablet,mobile}.png` plus
`screenshots/after-dark-desktop.png` — seven real Playwright captures.
Regenerate with `npm run capture -- dashboard` (or `npm run capture` for
every showcase) from `showcase/`.

## 5. Visual diff

See [`VISUAL_DIFF.md`](VISUAL_DIFF.md) — hierarchy, spacing, typography,
motion, accessibility, responsiveness, dark mode, and performance, plus a
real Tailwind/token interaction bug this showcase's construction found and
fixed (documented permanently in `tokens/README.md`, not just here).

## 6. Code-level diff and rationale

|                   | Baseline                               | After                                                                                                    |
| ----------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Styling           | Inline `style` objects, one-off values | Tailwind utilities against `tokens/design-tokens.ts`'s scale                                             |
| Sidebar           | Fixed `200px`, no responsive treatment | Collapses to a disclosure below `md:`                                                                    |
| Status indicators | Color-only text                        | Color + text, `color-mix()`-tinted pill                                                                  |
| Chart             | None                                   | Dependency-free inline SVG (`SparklineChart`), with a real visually-hidden data table for screen readers |
| Data states       | Happy path only                        | `loading`/`empty`/`error`/`data`, all real (`DataTable`'s required `state` prop)                         |
| Dark mode         | None                                   | Real, via the shared `.dark` token mechanism                                                             |
| Motion            | None                                   | `Fade` only, on the two data regions — deliberately not the landing page's scroll-triggered primitives   |

Rationale for each choice lives in `examples/analytics-dashboard/README.md`
(§2 design rationale, §5 motion decisions, §6 accessibility review) rather
than being restated here.
