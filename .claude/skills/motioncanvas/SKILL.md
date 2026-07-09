---
name: motioncanvas
description: Use when building or upgrading UI in a React/Next.js codebase — components, pages, dashboards, landing pages, hero sections — especially when motion, polish, or a "premium"/"agency-quality" feel is requested. Covers Tailwind CSS, Shadcn UI, Radix, Framer Motion, GSAP, Three.js/React Three Fiber, and Spline. Triggers on requests like "build a landing page", "add animation", "make this feel more premium", "dashboard UI", "hero section", "component library", "design system", "micro-interactions".
---

# MotionCanvas

A workflow and reference kit for producing UI that reads as deliberately designed
rather than default-generated — clear hierarchy, considered type/spacing, and motion
that supports the interface instead of decorating it.

This skill does not fetch or scrape anything live (no network calls to Awwwards,
Mobbin, 21st.dev, etc.). "Inspiration sources" below mean: draw on known patterns
from that ecosystem and reimplement them against this project's own tokens and
components — never copy external code or assets verbatim.

## Workflow

Run through these steps in order, scaling depth to the size of the ask. A single
button doesn't need a wireframe phase; a new dashboard does.

1. **Clarify intent** — what is this UI for, who uses it, what's the one thing it
   must communicate first. If the request is vague ("build me an AI app"), ask one
   or two concrete questions (audience, core action, reference product) before
   generating anything.
2. **Read the repo first** (see below) — never guess at conventions that are one
   `grep` away.
3. **Plan the structure** — layout/grid, content hierarchy, states (empty/loading/
   error/success), responsive breakpoints.
4. **Pick the design tokens** — reuse existing ones; only introduce new
   spacing/type/color values if none exist yet (see `references/design-system.md`).
5. **Pick motion** — only where it clarifies state change or hierarchy (see
   `references/motion-principles.md`). Default to none over gratuitous.
6. **Build** — smallest reasonable set of components, composed from what the repo
   already has or Shadcn/Radix primitives before reaching for a new dependency.
7. **Self-review** against `references/quality-checklist.md` before handing back.
   Fix anything that fails; note anything intentionally deferred (e.g. "didn't add
   Playwright coverage — say the word if you want it").

## Repo intelligence

Before writing new UI code, check:

- `tailwind.config.*` / `app/globals.css` — existing tokens (colors, spacing, radii,
  font scale). Extend these; don't invent a parallel system.
- `components/ui/**` or equivalent — Shadcn/Radix primitives already installed.
  Compose from them instead of rebuilding a button/dialog/dropdown from scratch.
- `package.json` — which motion/3D libraries are already a dependency
  (`framer-motion`, `motion`, `gsap`, `@react-three/fiber`, `lenis`, ...). Use what's
  there; don't add a second animation library that does the same job.
- Existing component naming/file layout conventions — match them.
- `prefers-reduced-motion` handling already present in the app (a provider, a hook)
  — hook into it rather than adding a competing one.

Never duplicate something that already exists in the codebase in a working form.
Extend or compose it.

## Component sourcing order

1. An existing component/pattern already in this repo.
2. Shadcn UI / Radix primitive, styled to this project's tokens.
3. A well-known open pattern from the Aceternity/Magic UI/Origin UI/HeroUI family of
   ideas, reimplemented in this project's stack and tokens (not copy-pasted).
4. Custom-built from scratch, following `references/design-system.md` and
   `references/motion-principles.md`.

Prefer the earliest option that satisfies the requirement.

## Reference material

- `references/design-system.md` — type scale, spacing scale, color/dark-mode
  approach, layout/grid defaults.
- `references/motion-principles.md` — easing/spring defaults, staggering,
  scroll-linked reveals, reduced-motion handling, when _not_ to animate.
- `references/quality-checklist.md` — the self-review pass: visual hierarchy,
  accessibility, performance, responsive/dark-mode correctness.
- `references/providers.md` — how to draw on external design ecosystems
  (Aceternity, Magic UI, Origin UI, HeroUI, Shadcn, Framer/Spline/Rive, LottieFiles)
  without live-fetching or copying assets.

## Reusable motion code

`snippets/` has drop-in, dependency-light building blocks — copy the relevant one
into the target project and adapt names/tokens rather than reinventing per request:

- `motion-provider.tsx` — `LazyMotion` + reduced-motion context, so every animated
  component in a project shares one source of truth for "should this animate".
- `use-magnetic-button.ts` — pointer-follow magnetic hover with a spring, respecting
  reduced motion.
- `use-premium-scroll.ts` — scroll-linked reveal hook built on Framer Motion's
  `useScroll`/`useTransform` (no extra dependency), with a GSAP `ScrollTrigger`
  variant commented alongside for projects that already depend on GSAP.
- `button.example.tsx` — a worked example composing the above into one component,
  as a reference for the bar to hit (states, focus ring, reduced motion, memoized).
- `motion/` — a twelve-primitive library (`Fade`, `Slide`, `Reveal`,
  `StaggerContainer`/`StaggerItem`, `ScrollReveal`, `HeroReveal`, `SpotlightFollow`,
  `AnimatedBorder`, `FloatingCard`, `CursorGlow`, `AuroraBackground`, plus shared
  `tokens.ts`) built on the same provider/hooks above. See `motion/README.md` for
  what each one is for and when _not_ to reach for it.

## Provider architecture

`providers/` decouples "where does inspiration/component metadata/motion catalog
data/templates/assets come from" from this workflow, so a new source can be added
without editing this file. `ComponentRegistryProvider` and `MotionLibraryProvider`
have real local implementations; `DesignInspirationProvider`, `TemplateProvider`,
and `AssetProvider` are interfaces only — there is no live integration with any
external service shipped here. See `providers/README.md` before claiming this
skill can search/score/fetch from a named external source; it can't, yet.

## Reference workflow example

`examples/ai-saas-landing/` is a complete, worked run of this workflow end to end
(requirements → design rationale → tokens → motion decisions → accessibility
review → performance notes → implementation) for a fictional AI SaaS landing
page. Read its `README.md` as the model for how much reasoning a real build
should show, not just its code.

## Contributing to this skill

The repo root has a `package.json`/`tsconfig.json`/`eslint.config.js` scoped to
`snippets/`, `providers/`, and `examples/` — `npm install`, then `npm run
typecheck` and `npm run lint` before adding or editing anything in those
directories. There's no test framework here on purpose: this is a reference
library copied into other projects, not a published package with its own runtime
behavior to unit-test: typecheck + lint is the meaningful bar. Add real tests
if that stops being true (e.g. a primitive gains non-trivial logic worth
asserting on in isolation).

## Output expectations

Scale deliverables to what was asked:

- One component or section → the component, correctly typed, accessible, and
  motion-appropriate. No unrequested test scaffolding or docs unless the project
  already has that convention.
- A new page/feature → also update routing/imports as needed, and flag (don't
  silently add) any new dependency.
- A full app/design-system buildout → proactively ask whether tests, Storybook, or
  a11y tooling (axe, Playwright) should be included, since those are real time/dep
  costs — don't assume yes.

Don't claim numeric quality scores ("Lighthouse 98", "WCAG 100%") — those require
actually running the tools. If asked to verify, run real Lighthouse/axe/Playwright
and report actual results instead of asserting a number.
