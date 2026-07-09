# Walkthrough: motion enhancement

## Prompt

> "The 'Save changes' button in our settings form just snaps between states.
> Can you make it feel a bit nicer when it goes into a loading/saved state?"

## Expected workflow

Matches `references/intent-taxonomy.md`'s `animation-request` category: "the
ask is purely to add/change motion on already-built UI, not build new UI."
That category's own notes flag the most common failure mode directly: adding
motion beyond the specific element mentioned. Scope tightly to the button.

1. **Read `references/motion-principles.md`'s "when not to animate" section
   first** — before picking anything, confirm this is a case where motion
   earns its cost: a state change (idle → loading → saved) is exactly the
   kind of transition motion should clarify, per that doc.
2. **Read the button's current implementation** — its existing states,
   whether it's already a Client Component, whether `framer-motion` is
   already a dependency in this project.
3. **Pick from `references/motion-director.md`'s micro-interaction
   guidance** — a state-change transition on a single control is a
   micro-interaction, not a page-level sequence; keep duration/easing
   inside whatever preset (or `snippets/motion/tokens.ts`'s defaults if the
   project has no preset convention yet) the rest of the app already uses,
   not a new one invented for this button.
4. **Implement narrowly** — animate the button's internal content swap
   (icon/label crossfade between idle/loading-spinner/saved-checkmark
   states), respecting `prefers-reduced-motion` via the same
   `MotionProvider` pattern as `snippets/motion-provider.tsx`. Do not touch
   the form's layout, other fields, or add a page-level transition — none of
   that was asked for.
5. **Accessibility check** — the loading state needs an
   `aria-live`/`aria-busy` announcement for screen-reader users independent
   of the visual animation; a spinner that's purely visual doesn't
   communicate "saving" to someone not looking at it.
6. **Review** — the relevant slice of `references/quality-checklist.md`
   (motion + accessibility), not the full seven-lens pipeline for a change
   this narrowly scoped — `SKILL.md`'s "scaling depth to the size of the
   ask" applies as much to the review step as to planning.

## Generated artifacts

- A small, targeted diff inside the existing button component: an
  `AnimatePresence`-wrapped icon/label swap between idle/loading/saved
  states, plus an `aria-live="polite"` region (or `aria-busy` on the button
  itself) announcing the state change.
- No new files, no new page sections, no design-token changes.

## Explanation

This is the scenario `references/intent-taxonomy.md`'s `animation-request`
category exists specifically to keep tightly scoped. The interesting risk
isn't picking the wrong primitive — it's scope creep: reading "make it feel
nicer" as license to also add a page transition, restyle the form, or
introduce a new preset. The workflow's answer is to read the narrow-scope
warning before touching anything, then implement exactly the state change
asked for.
