# Component library

Real, working components — every one extracted from and generalized out of
`examples/ai-saas-landing/` and `examples/analytics-dashboard/` (see each
file's own doc comment for exactly which build it came from), not built
speculatively ahead of a real need. Copy the file(s) you need into a target
project (e.g. `components/ui/`) and adapt import paths, same as
`snippets/motion/`. `references/roadmap.md`'s output-quality phase requires
future showcases to reuse these instead of rebuilding — both existing
examples were migrated to actually import from here (not just document the
intent), so this is a real, exercised dependency, not an aspirational one.

Most components consume `snippets/motion/` primitives and this skill's
semantic color tokens (`bg-card`, `text-muted-foreground`, etc. — see
`tokens/README.md`); several require a `<MotionProvider>` ancestor the same
way their source primitives do.

## Data display

- **`MetricCard`** — a labeled stat with a signed percent-change indicator
  (up/down icon + color, with a screen-reader-only "increase"/"decrease"
  label so the information isn't color-only).
- **`DataTable<T>`** — a real generic table: caller-defined `columns`
  (`{ key, header, render }`), any row type `T`, and the four states
  `references/intent-taxonomy.md`'s `dashboard` category requires as core
  features, not optional polish: `loading`/`empty`/`error`/`data`. See
  `examples/analytics-dashboard/data-table.tsx` for a real domain-specific
  wrapper (`EndpointsTable`) built on top of it.
- **`SparklineChart`** — a dependency-free inline SVG bar chart, with a
  real visually-hidden `<table>` of the same data for screen readers (a
  chart's pixels carry no information for assistive tech, and an
  `aria-label` summary can't express point-by-point values).
- **`StatusBadge`** — a tinted status pill using `color-mix()` against the
  resolved CSS variable, not Tailwind's `bg-{color}/10` opacity modifier
  (which silently produces a transparent background against this skill's
  tokens — see `tokens/README.md`'s "A real gotcha" section).

## States

- **`EmptyState`**, **`ErrorState`**, **`LoadingSkeleton`** — the three
  non-happy-path states every real data region needs
  (`role="status"`/`role="alert"`/`aria-live` respectively), extracted from
  `DataTable`'s original inline versions so any component can use them, not
  just tables.

## Layout / navigation

- **`Sidebar`** — persistent vertical nav with a real mobile disclosure
  (`aria-expanded`/`aria-controls`); routing stays the caller's
  responsibility (`activeHref`/`onNavigate` are controlled props, not
  internal state), so it doesn't assume a particular router. Ships with
  four generic icon components (`GridIcon`/`TableIcon`/`BellIcon`/`GearIcon`).
- **`Navbar`** — horizontal top nav with the same real mobile-disclosure
  pattern (`Escape` to close, keyboard-operable throughout). `renderCta` is
  a render-prop since the desktop and mobile CTA usually need different
  sizing (see `examples/ai-saas-landing/nav.tsx`'s own two `PremiumButton`
  calls this replaced).
- **`Topbar`** — a page header: title/description plus an `actions` slot
  for whatever a given page needs (search, avatar, buttons).
- **`FilterBar`** + **`SegmentedControl`** — a filter-row container and a
  controlled segmented control (any string options, not just date ranges).

## Marketing sections

- **`HeroSection`** — wraps `AuroraBackground` (optional — omit
  `auroraColors` for a plain hero) + `HeroReveal`; eyebrow/heading/
  subheading/actions stay caller-provided `ReactNode`, same as
  `HeroReveal` itself.
- **`FeatureGrid`** + **`FeatureCard`** — a `Reveal`-in heading/description
  plus a `StaggerContainer` grid of cards (2/3/4 columns), each card using
  `SpotlightFollow` for its hover affordance.
- **`CtaSection`** — a closing call-to-action on `AnimatedBorder`, with its
  own explicit light text color (it renders on a dark background
  regardless of the page's theme — see the file's own doc comment for why
  relying on inherited text color would be wrong here).

## What's deliberately not here

Bento grids, a command palette, pricing sections, and settings panels
aren't included — neither existing build needed one, so there's nothing
real to extract. Building any of them speculatively, ahead of a showcase
that actually needs one, is exactly the kind of unrequested-feature work
`references/roadmap.md`'s output-quality phase argues against. Add one here
only alongside a real showcase that uses it.
