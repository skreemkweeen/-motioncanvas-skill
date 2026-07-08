# Visual diff: baseline vs. after

Screenshots in `screenshots/` (desktop 1440px, tablet 834px, mobile 390px,
each captured with Playwright — see `../tooling/capture.mjs`). This file
narrates what changed and why, the way
`examples/ai-saas-landing/README.md`'s own reasoning trail does.

## Hierarchy

**Baseline**: everything is roughly the same visual weight — a 32px bold H1,
16px body text, uniformly centered. Nothing tells a skimming visitor where
to look first beyond reading order.

**After**: the hero gets the one high-contrast moment on the page (dark
background, largest type, the only saturated color) via `HeroReveal` +
`AuroraBackground`; everything after it is deliberately quieter. One thing
is clearly most important, per `references/design-system.md`.

## Spacing

**Baseline**: ad hoc pixel values (`16px 24px`, `48px 24px`, `64px 24px`) —
each section padding decided independently, no shared scale.

**After**: every spacing value traces to `tokens/design-tokens.ts`'s scale
via Tailwind's `py-24`/`py-32`/`py-40`/`px-6` etc. — one system, not one
value per section invented on the spot.

## Typography

**Baseline**: two sizes total (32px heading, 16/14px body), default
`system-ui`, no defined scale beyond "big" and "normal."

**After**: `references/design-system.md`'s type scale (`text-4xl`/`text-3xl`
hero and section headings, `text-lg`/`text-sm` body) — a bounded set of
sizes used consistently, not one-offs per element.

## Motion

**Baseline**: none.

**After**: `HeroReveal` sequences the hero's eyebrow/heading/subheading/
actions; `Reveal` brings each section heading in as it scrolls into view;
`StaggerContainer`/`StaggerItem` stagger the three feature cards; the CTA
gets `AnimatedBorder` + `Reveal` as the page's one other moment of
emphasis — matching `examples/ai-saas-landing/README.md`'s own §5 exactly,
since the "after" side imports those real components. Every animation
traces to a specific reason, not decoration for its own sake, per
`references/motion-principles.md`.

## Accessibility

**Baseline**: no `aria-expanded`/keyboard handling for anything (there's no
mobile menu at all — links just wrap awkwardly on narrow viewports); focus
rings are whatever the browser defaults to; no semantic landmark structure
beyond a bare `<header>`/`<main>`.

**After**: the real `Nav` component's mobile disclosure has real
`aria-expanded`/`aria-controls`, a visually-hidden label that changes with
state, closes on `Escape`, and full keyboard operability — see
`examples/ai-saas-landing/README.md` §6 for the complete review.

## Responsiveness

**Baseline**: no breakpoints at all — the feature grid uses `flex-wrap`,
which happens to reflow acceptably, but the nav has no mobile treatment and
the hero doesn't adjust type scale for smaller viewports (compare
`screenshots/baseline-mobile.png`'s cramped nav wrap against
`screenshots/after-mobile.png`'s real hamburger disclosure).

**After**: a real mobile nav disclosure below `sm:`, and a hero heading that
steps down from `text-5xl` to `text-4xl` on narrow viewports — see all
three `after-*.png` screenshots.

## Performance

Both sides are light (no images, no heavy scripts). The meaningful
difference is architectural, not this-page-specific: the after side follows
`examples/ai-saas-landing/README.md` §7's Server/Client Component boundary
discipline (only the motion primitives and the interactive nav carry
`"use client"`), which the baseline — being a single, undifferentiated
component — doesn't have an equivalent of at this scale, but would need to
adopt as it grew.

## What building this showcase actually found

Building the capture pipeline for the "after" side didn't just prove the
existing code works — it found three real, previously-shipped defects that
`npm run typecheck`/`lint` could never catch, because they're runtime/visual
problems, not type errors:

1. **`tokens/compile-tailwind.ts` emitted camelCase color keys**
   (`mutedForeground`) instead of kebab-case (`muted-foreground`). Tailwind
   emits theme keys verbatim into class names — every `text-muted-foreground`
   in `examples/ai-saas-landing/` was silently a no-op class. Fixed in
   `tokens/compile-tailwind.ts`; the "after" screenshot is the actual
   evidence it now works.
2. **`AuroraBackground` hardcoded `position: "relative"` via inline style**,
   which unconditionally overrode the `absolute` Tailwind class
   `hero.tsx` passed via `className` (an inline `style` always wins over a
   class, regardless of specificity or source order). The result: the
   hero's background container collapsed to zero height, and the aurora
   blobs — sized as percentages of that zero-height box — were invisible.
   Fixed by adding an explicit `position` prop instead of relying on a
   `className` the component could never actually honor.
3. **`cta.tsx`'s heading had no explicit text color** against
   `AnimatedBorder`'s dark background, inheriting the page's default black
   text — functionally invisible (a real contrast/accessibility failure,
   not a hypothetical one). Fixed by adding `text-white`/`text-white/70` to
   match how `hero.tsx` handles its own dark section.

All three are now fixed in the actual `examples/ai-saas-landing/` source,
not just in this showcase's copy — because the "after" side isn't a copy,
it imports that source directly. This is the concrete case for real
screenshots over code-only review: none of these three bugs were visible by
reading the TypeScript.
