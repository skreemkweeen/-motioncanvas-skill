# Motion primitive library

Copy the files you need into a target project (e.g. `components/motion/`) and
adapt import paths — this is a reference library, not a published package.
Every primitive here is built only on Framer Motion (already a dependency of
the parent `motion-provider.tsx`/hooks) — no additional runtime dependencies.

All components except `AuroraBackground` and `SpotlightFollow` require a
`<MotionProvider>` ancestor (`../motion-provider.tsx`) — it supplies the
`LazyMotion` feature bundle those components render into (`m.*`), and the
shared reduced-motion flag.

## Tokens (`tokens.ts`)

Shared duration/ease/spring/distance/stagger constants. Import these into any
custom motion code instead of hand-rolling values, so a project's motion
stays one system. See `references/motion-principles.md` for the rationale.

## Entrance primitives

| Component      | Trigger                                     | Use for                                                                                              |
| -------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Fade`         | mount / `AnimatePresence` exit              | opacity-only, when you're unsure motion is even warranted                                            |
| `Slide`        | mount / exit                                | directional translate + opacity on mount (modals, toasts, list items appearing)                      |
| `Reveal`       | scrolls into viewport (`whileInView`, once) | sections, cards, copy revealing as the page scrolls                                                  |
| `ScrollReveal` | continuous scroll progress                  | a softer, continuously-tied-to-scroll version of Reveal; thin wrapper around `use-premium-scroll.ts` |

```tsx
<Reveal direction="up" delay={0.1}>
  <h2>Section heading</h2>
</Reveal>
```

## Staggering (`stagger-container.tsx`)

`StaggerContainer` + `StaggerItem` are a pair — `StaggerItem` has no
`initial`/`animate` of its own by design; it inherits variant state from the
nearest `StaggerContainer` ancestor, which is what produces the staggered
timing. Don't insert an unrelated animated element between them.

```tsx
<StaggerContainer className="grid grid-cols-3 gap-6">
  {features.map((f) => (
    <StaggerItem key={f.id}>
      <FeatureCard {...f} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

## `HeroReveal`

A composed hero entrance (eyebrow → heading → subheading → actions) built
entirely from `StaggerContainer`/`StaggerItem` — the heading gets the
largest distance/duration in the group, since the most important element
should carry the most distinct motion.

```tsx
<HeroReveal
  eyebrow={<Badge>New</Badge>}
  heading={<h1>Ship faster with less noise</h1>}
  subheading={<p>...</p>}
  actions={<PremiumButton>Get started</PremiumButton>}
/>
```

## Hover / ambient effects

- **`SpotlightFollow`** — pointer-following radial highlight for a card. No
  Framer Motion involved: the pointer position is written directly to a CSS
  custom property on the DOM node (not React state) since `pointermove`
  fires far too often to re-render on.
- **`CursorGlow`** — a soft blurred glow that follows the pointer across an
  entire section (fixed-position, not scoped to one card). Skips attaching
  any listener on touch devices or when reduced motion is preferred.
- **`AnimatedBorder`** — rotating conic-gradient border, driven by a
  `--angle` CSS custom property updated via `useAnimationFrame` rather than
  a per-frame React re-render.
- **`FloatingCard`** — continuous subtle idle float. Reserve for a hero
  product shot or single decorative element — looping motion in dense UI
  (lists, dashboards) reads as flickery, not premium.
- **`AuroraBackground`** — slow-drifting blurred gradient blobs for hero
  backgrounds. Pure CSS `@keyframes` (no Framer Motion) with its own
  `@media (prefers-reduced-motion: reduce)` override, so it degrades safely
  even outside a `<MotionProvider>`.

## What's deliberately not here

No page-transition primitive is included — page/route transitions depend on
the target project's router (Next.js App Router view transitions, Pages
Router `_app` wrapper, React Router, etc.) enough that a one-size version
would be a placeholder. Wire `AnimatePresence` at the router boundary in the
target project instead; the entrance primitives above compose fine inside it.
