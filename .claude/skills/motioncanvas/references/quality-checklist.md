# Self-review checklist

Run through this before handing back UI work. It's a checklist to reason
through, not a numeric score to assert — only report a metric (Lighthouse,
axe violation count, bundle size) if you actually ran the tool that produces
it.

## Visual hierarchy & design

- [ ] The single most important element/action is unambiguous at a glance.
- [ ] Type scale and spacing come from the project's tokens
      (`references/design-system.md`), not one-off values.
- [ ] Contrast passes AA (4.5:1 body, 3:1 large text) in **both** light and
      dark theme, if the project has dark mode.
- [ ] Every interactive element has visible hover, focus, active, disabled,
      and (if applicable) loading states.
- [ ] Layout holds up at the project's actual breakpoints (not just desktop
      and one mobile width — check the in-between).

## Motion

- [ ] Every animation clarifies a state change or hierarchy — nothing purely
      decorative that a user would find distracting on repeat viewing.
- [ ] `prefers-reduced-motion` is respected (opacity-only fallback, no
      parallax/large-translate/looping motion when reduced).
- [ ] Durations/easings match `references/motion-principles.md` defaults
      unless there's a specific reason to deviate.
- [ ] No animation blocks or delays a critical action (form submit, error
      display).

## Accessibility

- [ ] Semantic HTML first (`button`, `nav`, `dialog`, headings in order) —
      ARIA only fills gaps semantic HTML can't cover.
- [ ] Full keyboard operability: tab order makes sense, nothing is a mouse-only
      trap (custom dropdowns, drag interactions, magnetic buttons all need a
      keyboard/non-pointer path).
- [ ] Images/icons have appropriate `alt`/`aria-hidden`; decorative motion
      elements are `aria-hidden`.
- [ ] Color is never the only signal (paired with icon/text/shape).

## Performance

- [ ] Heavy dependencies (Three.js/R3F, Spline, large chart libs) are
      dynamically imported / code-split, not in the main bundle for a page
      that doesn't need them on first paint.
- [ ] Animations only touch `transform`/`opacity` where possible.
- [ ] Expensive components are memoized where re-renders are frequent
      (dashboards, lists); not applied reflexively everywhere.
- [ ] Images use the framework's image component / explicit width+height to
      avoid layout shift.
- [ ] No obvious layout-shift sources: reserved space for async content,
      skeletons sized to match real content.

## Code quality

- [ ] Reuses existing components/hooks/tokens instead of duplicating them.
- [ ] Props are typed, no `any` escape hatches introduced without reason.
- [ ] New dependencies are justified — was there already a library in
      `package.json` that does this?
- [ ] Matches the project's existing naming/file-layout conventions.

## Before claiming "production-ready"

Don't. Say what you verified (typecheck passed, dev server rendered it,
manually checked keyboard nav) and what's still unverified (no Lighthouse run,
no automated a11y scan) rather than asserting a blanket quality claim.
