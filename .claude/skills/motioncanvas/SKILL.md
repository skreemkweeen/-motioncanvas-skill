---
name: motioncanvas
description: Shared reference library and provider/plugin/token infrastructure for the motioncanvas skill family — snippets, design system defaults, motion primitives, providers, examples. Not typically triggered directly; the `motioncanvas-*` skills (core, dashboard, landing, review, motion, design-system) are the ones a request should invoke, and they draw on everything here.
---

# MotionCanvas (shared library)

This directory is the infrastructure the whole `motioncanvas-*` skill family
shares — reference docs, copy-in motion snippets, providers, plugins,
tokens, and worked examples. It is not itself the enforced, gate-driven
workflow: that lives in `../motioncanvas-core/SKILL.md` and its five
siblings, each short and strict on purpose (see `references/roadmap.md` for
why this split happened). Read this file when a sibling skill points you
here for something specific, not as a starting point on its own.

## Component sourcing order

1. An existing component/pattern already in this repo.
2. Shadcn UI / Radix primitive, styled to this project's tokens.
3. A well-known open pattern from the Aceternity/Magic UI/Origin UI/HeroUI
   family of ideas, reimplemented in this project's stack and tokens (not
   copy-pasted).
4. Custom-built from scratch, following `references/design-system.md` and
   `references/motion-principles.md`.

Prefer the earliest option that satisfies the requirement. When step 3
turns up more than one usable candidate, see `references/component-composition.md`
for how to evaluate, merge, normalize, and (if the project tracks one)
register the result instead of picking one candidate and copying it.

## Reference material

| File                        | What it covers                                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `visual-identity-engine.md` | Anti-generic rules, originality scoring, visual DNA/concept generation, AI cliché detection — the VisualIdentity gate. |
| `execution-principles.md`   | The mandatory pre-return checklist every `motioncanvas-*` skill's DesignCritique gate runs.                            |
| `intent-taxonomy.md`        | Eleven request categories and their defaults (`analysis/intent-taxonomy.ts`).                                          |
| `component-composition.md`  | Evaluating/merging/normalizing multiple component candidates.                                                          |
| `design-system.md`          | Type scale, spacing scale, color/dark-mode approach, layout/grid defaults.                                             |
| `motion-principles.md`      | Easing/spring defaults, staggering, scroll reveals, reduced motion, when not to animate.                               |
| `motion-director.md`        | Preset selection and per-interaction-category guidance.                                                                |
| `quality-checklist.md`      | Detailed self-review criteria: hierarchy, accessibility, performance, responsive/dark-mode correctness.                |
| `review-pipeline.md`        | The same criteria as seven named review lenses run in sequence.                                                        |
| `design-critique-mode.md`   | Review-only mode for evaluating existing UI instead of building new.                                                   |
| `providers.md`              | Drawing on external design ecosystems without live-fetching or copying assets.                                         |
| `architecture.md`           | Diagram of how all of the above fit together, including the skill family.                                              |
| `extending.md`              | Adding a new motion primitive, provider, or reference example.                                                         |
| `prompt-modules.md`         | Why each reference file is a lazily-loaded module already.                                                             |
| `roadmap.md`                | What's built vs. planned, and why the skill family split happened.                                                     |
| `api-reference.md`          | Every exported symbol, classified Public/Internal/Interface-only.                                                      |
| `release-audit.md`          | v1.0 stability/performance/workflow validation results.                                                                |

`analysis/` holds the typed artifacts each gate produces: `ProjectProfile`,
`CreativeBrief`, and `VisualIdentity` (type + doc for each). `providers/`
and `plugins/` are the design-source abstraction and its real, executed
runtime (`npm run plugins:smoke`) — see their own `README.md`s before
describing either as more than what they are. `tokens/` is the design-token
compiler (`npm run tokens:build`). `commands/` is a metadata catalog of this
skill's workflow entry points (not the live slash commands — those are
`../../commands/*.md` at the repo root; see `commands/README.md`).

## Reusable motion code

`snippets/` has drop-in, dependency-light building blocks — copy the
relevant file into the target project and adapt names/tokens rather than
reinventing per request. `motion/` is a twelve-primitive library plus eight
presets (see `motion/README.md`, including its progressive-enhancement
section); `components/` is the extracted, generalized component library
harvested from the worked examples (see `components/README.md`). Each
file's own doc comment covers what it's for and when not to reach for it.

## Reference workflow examples

`examples/ai-saas-landing/` and `examples/analytics-dashboard/` are
complete, worked runs of the full pipeline for a persuasive marketing page
and a dense internal dashboard respectively — read either `README.md` as
the model for how much reasoning a real build should show. `examples/gallery/`
has seven shorter narrated walkthroughs for other request shapes.
`showcase/` has real, rendered before/after screenshots, fully isolated from
this repo's own tooling — see its `README.md`.

## Contributing to this skill

See the repo root's `CONTRIBUTING.md` for setup and rules, and
`references/extending.md` for step-by-step instructions. No test framework
here on purpose — typecheck + lint is the meaningful bar for a reference
library copied into other projects; add real tests only if a primitive
gains non-trivial logic worth asserting on in isolation.
