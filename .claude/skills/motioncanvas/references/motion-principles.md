# Motion principles

Motion should clarify state and hierarchy — what appeared, what changed, what's
next to look at. If an animation doesn't do one of those, cut it. Adapted from
classical animation principles, applied to interface motion:

- **Anticipation** — a small pre-move before the real move (a button
  compressing slightly before a modal springs open) reads as more physical than
  an instant cut to the end state.
- **Follow-through / overshoot** — elements arriving with a slight overshoot
  and settle (spring, not linear ease) feel physical. Use it for things
  entering the screen (cards, modals, toasts), not for things the user is
  actively dragging/tracking.
- **Secondary motion** — a parent moving can offset children slightly
  (staggered children, a subtle rotation on an icon inside a moving button) —
  small amplitude, never competing with the primary motion.
- **Staggering** — list/grid items revealing with a 40–80ms delay between
  siblings reads as intentional; all-at-once reads as a layout jump.
- **Motion hierarchy** — the most important change on screen gets the most
  distinct motion; everything else should be quieter (shorter duration,
  smaller displacement) so it doesn't compete.

## Defaults

- **Duration**: micro-interactions (hover, toggle) 120–200ms; entrances/exits
  200–400ms; page-level transitions 300–500ms. Slower than ~600ms starts to
  feel sluggish for UI (fine for hero/cinematic moments, not for a button).
- **Easing**: use spring physics for anything that should feel touchable
  (buttons, drags, cards) — Framer Motion default-ish spring
  `{ type: "spring", stiffness: 300, damping: 30 }` is a reasonable starting
  point; tune stiffness up for snappier, damping up to reduce overshoot.
  Use standard eases (`easeOut` for entrances, `easeInOut` for state swaps) for
  layout/opacity transitions where a spring would feel unnecessary.
- **Displacement**: keep translate distances small (8–24px) for UI elements
  entering in place; reserve larger displacement for full-screen/hero moments.

## Scroll storytelling / progressive reveal

- Reveal content as it enters the viewport (fade + small translate), staggered
  across siblings — don't animate everything on scroll, just the moments that
  benefit from a beat of emphasis (feature sections, stats, testimonials).
- Parallax/camera-choreography effects (`useScroll` + `useTransform`, or GSAP
  `ScrollTrigger` `scrub`) belong in hero/story sections, not in dense UI like
  dashboards or forms — it costs performance and adds nothing there.
- Depth illusion: a background layer moving slower than foreground content on
  scroll (0.3–0.6x speed) reads as depth without needing 3D.

## Animated typography

- Reserve character/word-level reveal animations for hero headlines or key
  moments — never body copy or long-form text, it becomes an obstacle to
  reading.
- Prefer animating `opacity`/`transform` on text (masked reveal, stagger by
  word) over animating layout-affecting properties.

## Reduced motion

Always check `prefers-reduced-motion` and provide a reduced/no-motion path —
don't just shorten durations, actually drop non-essential transforms
(parallax, large translates, autoplaying loops) and keep opacity-only
transitions. In React:

```ts
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
const variants = shouldReduceMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
```

## Progressive enhancement (no-JS safety)

Motion is an enhancement, not a requirement to perceive content. Any
viewport/mount-triggered reveal (`whileInView`, `initial` + `animate`) hides
its content in the server-rendered HTML until JavaScript runs to reveal it —
if JS is disabled, blocked, or fails to load, that content stays invisible
forever unless the primitive explicitly guards against it. See
`snippets/motion/README.md`'s "Progressive enhancement (no-JS safety)"
section for the concrete mechanism (`data-motion-reveal` marker +
`no-js.css` + `NoJsGuardScript`) this library's entrance primitives use.
When building a new one, carry the same marker rather than treating this as
a one-off fix for whichever component happened to need it first.

## Performance

- Animate `transform`/`opacity` only where possible — avoid animating
  `width`/`height`/`top`/`left` (triggers layout).
- Use `will-change` sparingly and only on elements actively animating, not
  globally.
- Prefer Framer Motion's `LazyMotion`/`domAnimation` feature bundle over the
  full `motion` import to cut bundle size when only basic transforms/opacity
  are needed.
- For GSAP + `ScrollTrigger`, always clean up (`.kill()`/`ctx.revert()`) in a
  `useEffect` cleanup or `useGSAP` context — leaked ScrollTriggers on
  route/unmount are a common source of jank in SPA navigation.
- Debounce/rAF-throttle pointer-driven effects (magnetic buttons, cursor
  followers) — never animate directly off a raw unthrottled mousemove handler.

## When _not_ to animate

- Form validation errors, critical alerts, and anything blocking user
  progress — show instantly, don't make the user wait out a transition.
- Data-dense tables/dashboards refreshing frequently — animating every re-render
  reads as flickery, not premium.
- Anything where the animation duration would measurably delay task
  completion for a repeat/power user.
