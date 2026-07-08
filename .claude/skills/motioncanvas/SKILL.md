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

Run through these stages in order, scaling depth to the size of the ask. A single
button doesn't need a wireframe phase; a new dashboard does. Each stage name below
is the one used consistently across this skill's docs (`analysis/`, `references/`)
— see `references/architecture.md` for the same pipeline as a diagram.

1. **Intent + requirements** — classify the request against
   `references/intent-taxonomy.md`'s eleven categories to get concrete
   defaults instead of generic instinct, then fill in a creative brief
   (`analysis/creative-brief.ts`) for anything beyond a single component. If
   the request is vague ("build me an AI app"), ask one or two concrete
   questions (audience, core action, reference product) before generating
   anything.
2. **Research** — read the target repo first (`analysis/README.md`); for
   inspiration on patterns, see `references/providers.md`. Never guess at a
   convention that's one `grep` away.
3. **Planning + layout** — structure, grid, content hierarchy, states
   (empty/loading/error/success), responsive breakpoints.
4. **Design system** — pick tokens; reuse what the target repo already has, only
   introduce new spacing/type/color values if none exist yet (see
   `references/design-system.md` and `snippets/tokens.css`).
5. **Components** — smallest reasonable set, composed from what the repo already
   has or Shadcn/Radix primitives before reaching for a new dependency (see
   Component sourcing order below).
6. **Motion** — only where it clarifies state change or hierarchy (see
   `references/motion-principles.md`); pick and apply a preset consistently
   per `references/motion-director.md`. Default to none over gratuitous.
7. **Accessibility + performance + review** — run the self-review pass
   (`references/review-pipeline.md`, backed by `references/quality-checklist.md`)
   before handing back. Fix anything that fails; note anything intentionally
   deferred (e.g. "didn't add Playwright coverage — say the word if you want it").
8. **Code + documentation** — the implementation plus whatever documentation is
   proportional to the change (see Output expectations below) — not a fixed
   checklist run on every request regardless of size.

If the request is to evaluate an _existing_ UI rather than build something new,
switch to `references/design-critique-mode.md` instead of this pipeline — it's
review-only, no code changes unless asked.

## Repo intelligence

Before writing new UI code, check the target repo's existing tokens,
installed component/motion libraries, naming conventions, and
`prefers-reduced-motion` handling — never invent a parallel system or
duplicate something that already works in the codebase; extend or compose
it. For anything beyond a single small component, formalize this into a
`ProjectProfile` (`analysis/project-profile.ts`) before generating code —
`analysis/README.md` maps each field to the exact tool call that answers it.

## Component sourcing order

1. An existing component/pattern already in this repo.
2. Shadcn UI / Radix primitive, styled to this project's tokens.
3. A well-known open pattern from the Aceternity/Magic UI/Origin UI/HeroUI family of
   ideas, reimplemented in this project's stack and tokens (not copy-pasted).
4. Custom-built from scratch, following `references/design-system.md` and
   `references/motion-principles.md`.

Prefer the earliest option that satisfies the requirement. When step 3 turns
up more than one usable candidate, see `references/component-composition.md`
for how to evaluate, merge, normalize, and (if the project tracks one)
register the result instead of picking one candidate and copying it.

## Reference material

- `references/intent-taxonomy.md` — the eleven request categories and where
  to find each one's defaults (`analysis/intent-taxonomy.ts`).
- `references/component-composition.md` — evaluating, merging, and
  normalizing multiple component candidates instead of picking one and
  copying it.
- `references/design-system.md` — type scale, spacing scale, color/dark-mode
  approach, layout/grid defaults.
- `references/motion-principles.md` — easing/spring defaults, staggering,
  scroll-linked reveals, reduced-motion handling, when _not_ to animate.
- `references/motion-director.md` — preset selection and per-interaction-
  category guidance (page transitions, scroll choreography, hero sequences,
  micro-interactions, loading states, hover, gesture).
- `references/quality-checklist.md` — the detailed self-review criteria: visual
  hierarchy, accessibility, performance, responsive/dark-mode correctness.
- `references/review-pipeline.md` — the same criteria organized into seven named
  review lenses (Creative Director, UX Architect, Motion Director, React
  Architect, Accessibility Auditor, Performance Engineer, Code Reviewer) run in
  sequence, with the expected output shape for each.
- `references/design-critique-mode.md` — the review-only mode for evaluating an
  existing UI instead of building a new one.
- `references/providers.md` — how to draw on external design ecosystems
  (Aceternity, Magic UI, Origin UI, HeroUI, Shadcn, Framer/Spline/Rive, LottieFiles)
  without live-fetching or copying assets.
- `references/architecture.md` — a diagram of how all of the above fit together.
- `references/extending.md` — how to add a new motion primitive, provider, or
  reference example to this skill.
- `references/prompt-modules.md` — why each reference file above is a lazily-
  loaded "module" already, and why there's no separate runtime for that.
- `references/roadmap.md` — what's built vs. planned, and why the next phase
  should mostly use this architecture rather than keep expanding it.
- `references/api-reference.md` — every exported symbol across `snippets/`,
  `providers/`, `plugins/`, `commands/`, `tokens/`, and `analysis/`,
  classified Public/Internal/Interface-only.
- `analysis/` — the `ProjectProfile` type/README for the repo-intelligence
  stage, and the `CreativeBrief` type/doc for the intent stage.
- `plugins/` — the plugin runtime wrapping design-source providers (21st.dev,
  Figma, Spline, ...); see `plugins/README.md`.
- `commands/` — a metadata catalog of this skill's own workflow entry points,
  with a drift validator; see `commands/README.md`.
- `tokens/` — the design-token compiler (single source of truth → CSS/
  Tailwind/TypeScript/JSON); see `tokens/README.md`.

## Reusable motion code

`snippets/` has drop-in, dependency-light building blocks — copy the relevant
file into the target project and adapt names/tokens rather than reinventing
per request. `motion-provider.tsx`, `use-magnetic-button.ts`,
`use-premium-scroll.ts`, and `button.example.tsx` are the base layer;
`motion/` is a twelve-primitive library plus eight presets built on top of
them (see `motion/README.md`); `tokens.css`/`design-tokens.ts`/`tokens.json`/
`tailwind-theme-extension.ts` are generated from `tokens/design-tokens.ts`
(see `tokens/README.md`). Each file's own doc comment covers what it's for
and when _not_ to reach for it — this list is just so you know they exist.

## Provider architecture

`providers/` decouples "where does inspiration/component metadata/motion catalog
data/templates/assets come from" from this workflow, so a new source can be added
without editing this file. `ComponentRegistryProvider`, `MotionLibraryProvider`,
`DesignInspirationProvider` (a local-JSON pattern for 21st.dev/Magic UI/
Aceternity UI, plus a real Figma REST API client), and `AssetProvider` (real
local `.splinecode` file resolution) all have real implementations, scoped
honestly — see `providers/README.md` for exactly what each one can and can't
do before claiming this skill can search/score/fetch from a named external
source. `TemplateProvider` remains interface-only.

## Plugin system

`plugins/` wraps providers in a small, real, in-process plugin runtime —
registration, config validation, dependency resolution, version
compatibility, and filesystem-based discovery. It's exercised end to end by
`npm run plugins:smoke`, not just typechecked. It is not a sandbox or a
marketplace — see `plugins/README.md` for exactly what it does and doesn't
do before describing it to a user.

## Reference workflow example

`examples/ai-saas-landing/` is a complete, worked run of this workflow end to end
(requirements → design rationale → tokens → motion decisions → accessibility
review → performance notes → implementation) for a fictional AI SaaS landing
page. Read its `README.md` as the model for how much reasoning a real build
should show, not just its code.

## Contributing to this skill

See the repo root's `CONTRIBUTING.md` for setup and rules, and
`references/extending.md` for step-by-step instructions on adding a new
motion primitive, provider, or reference example. There's no test framework
here on purpose: this is a reference library copied into other projects, not
a published package with its own runtime behavior to unit-test — typecheck +
lint is the meaningful bar. Add real tests if that stops being true (e.g. a
primitive gains non-trivial logic worth asserting on in isolation).

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
