# Walkthrough: component modernization

## Prompt

> "Our `PricingCard` component works but looks dated — flat, no motion, hard
> border. Can you modernize it without changing its API?"

## Expected workflow

This is an upgrade to existing UI, not new UI — `SKILL.md`'s frontmatter
description explicitly covers "building or upgrading UI," and
`references/intent-taxonomy.md`'s `component` category applies ("scope is
exactly what's asked, not a checklist" — skip the intent-taxonomy/creative-
brief steps entirely, per that category's own note).

1. **Research first, always** — read the existing `PricingCard` in full: its
   current props, styling approach, and any tests/stories referencing it.
   "Modernize without changing its API" is a hard constraint discovered here,
   not assumed — check every call site so the prop contract genuinely
   doesn't move.
2. **Search for a better pattern** — `references/component-composition.md`'s
   step 1: check the target repo for a similar-but-newer component first
   (maybe a `FeatureCard` already got this treatment), then the project's
   `ComponentRegistryProvider` if it uses one, then Shadcn/Radix card
   primitives, then inspiration sources — stopping at the first real match.
3. **Evaluate + merge** — if an inspiration source has a pricing-card layout
   worth borrowing (better spacing, a clearer price/CTA hierarchy), combine
   its layout idea with this project's own interaction conventions per
   `component-composition.md` §3 — never copy its markup verbatim.
4. **Normalize** — match the merged result to this project's own naming,
   tokens, and motion preset (component-composition.md §4), not the
   inspiration source's.
5. **Motion** — this is where "modernize" concretely cashes out:
   `AnimatedBorder` in place of the flat hard border,
   `SpotlightFollow` for hover if the card sits in an interactive
   context, per `references/motion-director.md`'s interaction-category
   guidance for micro-interactions/hover states. Only add what "modernize"
   actually implies — not every primitive available.
6. **Accessibility + performance + review** — confirm the new motion
   respects `prefers-reduced-motion` and doesn't regress keyboard/focus
   behavior the original had (`references/quality-checklist.md`).
7. **Register** — if the project tracks a `ComponentRegistryProvider`,
   update the existing registration rather than creating a duplicate entry
   (`component-composition.md` §5's "avoid duplicate functionality" rule).

## Generated artifacts

- The same `PricingCard.tsx` file, same exported prop types, internals
  updated: `AnimatedBorder` wrapping the card, `SpotlightFollow` on hover,
  tokens brought in line with `references/design-system.md` if they'd
  drifted.
- No new component, no new file, no API change — a diff, not a rewrite.

## Explanation

The failure mode this walkthrough is guarding against is treating every
request as a from-scratch build. "Modernize without changing the API" is
both a creative brief and a hard technical constraint stated in one
sentence — the workflow's job is to honor both, which means research (what
exists today, what calls it) has to come before any component-sourcing or
motion decision, not after.
