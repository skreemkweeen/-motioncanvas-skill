# Motion director

Operationalizes motion planning per interaction category — built entirely
on `snippets/motion/`'s existing primitives and `presets.ts`'s eight
presets. No new primitive is introduced here; if a category below needs
something the library doesn't have, that's a gap to flag, not license to
add a new subsystem mid-build.

## Selecting a preset

1. Read `recommendedMotionPreset` off `references/intent-taxonomy.md`'s
   classification for this build.
2. If it's `"inherit-existing"` — check `analysis/project-profile.ts`'s
   findings for an existing motion setup in the target repo and use that
   instead of picking a preset fresh.
3. If it's `"not-applicable"` (the `design-system` category) — ship the
   tokens/presets themselves as the deliverable rather than committing the
   target product to one.
4. Otherwise, swap that preset's `duration`/`ease`/`spring`/`distance`/
   `stagger` values in for every primitive used in this build (in place of
   `tokens.ts`'s defaults) — see `presets.ts`'s own usage note. Consistency
   across the whole build is what makes it read as one system, not scattered
   effects.

## By interaction category

### Page transitions

No dedicated primitive ships for this (see `snippets/motion/README.md`'s
"what's deliberately not here") — wire `AnimatePresence` at the target
project's own router boundary, using the selected preset's `duration.base`
and `ease.inOut`. Keep it short (100–250ms) regardless of preset; anything
longer measurably delays perceived navigation speed.

### Scroll choreography

- `Reveal` (viewport-triggered, once) for standard section reveals.
- `ScrollReveal` (continuous scroll-linked) for one hero/standout moment —
  reserve it; continuous scroll-linked motion is expensive to reason about
  and easy to overdo everywhere.
- `StaggerContainer`/`StaggerItem` for feature grids and lists, using the
  selected preset's `stagger` value.
- Depth/drift effects (`AuroraBackground`) belong in hero sections only —
  skip entirely for `dashboard`/`admin-panel` categories.

### Hero sequences

`HeroReveal` is the default composition (eyebrow → heading → subheading →
actions), already built from `StaggerContainer`/`StaggerItem` — swap in the
selected preset's values. Add `AuroraBackground` or `FloatingCard` only for
design-forward `landing-page`/`portfolio` builds; skip for
`dashboard`/`admin-panel`/`marketplace`.

### Micro-interactions

- Tap/press feedback: a small `whileTap` scale using the preset's `snappy`
  spring (see `button.example.tsx`'s pattern).
- `useMagneticButton` for a primary CTA in `landing-page`/`portfolio`
  builds; skip for `admin-panel`/`dashboard` (reads as frivolous there) and
  for touch-primary surfaces (no hover to key off of).

### Loading states

Prefer skeleton shapes sized to match real content over spinners — avoids
layout shift and reads as faster, especially for `dashboard`/`admin-panel`.
If a spinner is used at all, keep it to opacity/rotate only; this is not a
place for a preset's overshoot.

### Hover behavior

- `SpotlightFollow` for card-level "this is interactive" affordance.
- `CursorGlow` for a section-level ambient affordance — `landing-page`/
  `portfolio` only, one per page.
- Every hover effect needs a keyboard/focus-visible equivalent — a
  mouse-only affordance fails `quality-checklist.md`'s accessibility bar.

### Gesture support

No dedicated primitive ships for drag/swipe (a dismissible sheet, a
carousel) — use Framer Motion's own `drag`/`dragConstraints` props directly;
gesture needs vary too much per case to templatize honestly. Always pair a
gesture with a non-gesture path (a visible button alternative to a swipe) —
gesture-only interactions exclude anyone not using that exact input method.

## Cross-check before finishing

Re-read the creative brief's `animationStrategy` field
(`analysis/creative-brief.ts`) and confirm every motion choice traces back
to it. If a decision doesn't serve the stated strategy, cut it —
`references/motion-principles.md`'s "when not to animate" applies here too.
