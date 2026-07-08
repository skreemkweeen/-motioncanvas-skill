# Component composition

How to go from "I need a pricing card" to a finished component without
either rebuilding from scratch or copy-pasting one inspiration source
wholesale. Extends `SKILL.md`'s Component sourcing order with the concrete
steps for when more than one candidate is in play.

## 1. Search

In order (same as `SKILL.md`'s sourcing order):

1. The target repo itself — `analysis/project-profile.ts`'s
   `componentLibrary` field, or a direct search for something similar
   already built.
2. If the project has adopted this skill's `ComponentRegistryProvider`
   pattern, check its registry for a prior registration matching the
   category/keyword.
3. Shadcn/Radix primitives already installed.
4. `DesignInspirationProvider` results — the local-JSON catalog pattern
   (21st.dev/Magic UI/Aceternity UI) or a configured Figma source, per
   `providers/README.md`.

Stop at the first step that actually produces a usable match — don't search
step 4 if step 1 already has what's needed.

## 2. Evaluate candidates

For each candidate found in step 1.4, score it against
`references/quality-checklist.md`'s criteria, not just visual appeal:
hierarchy, accessibility, performance cost, and whether its motion (if any)
fits `references/motion-principles.md`. If the provider's own `score()` is
heuristic (see `design-inspiration-provider.ts`'s doc comment), treat it as
one input, not a verdict — the checklist is the actual bar.

## 3. Merge, don't pick-and-copy

When two candidates each have one strong idea — one's layout is right, the
other's interaction pattern is right — combine them: implement the layout
from the first with the interaction from the second, built fresh against
this project's own tokens and components. Never copy either source's actual
markup/code verbatim (`references/providers.md`'s rule). Note in a comment
or the PR description which idea came from where and why, the way
`examples/ai-saas-landing/README.md` documents its own choices — that's
what makes it a considered composition instead of an unexplained mashup.

## 4. Normalize

Before calling it done, make sure the merged result matches the rest of the
project, not just internal consistency between the merged ideas:

- **Naming** — the convention from `analysis/project-profile.ts`'s
  `namingConventions` field, not whatever each source originally used.
- **Styling** — `references/design-system.md`'s tokens (or the target
  project's own, if it has them) — no hardcoded values inherited from a
  source.
- **Accessibility** — the full `quality-checklist.md` pass, not just
  whichever candidate happened to have better a11y.
- **Motion** — the preset from `references/intent-taxonomy.md`'s
  classification for this build, via `references/motion-director.md` —
  not whichever candidate's animation was more impressive in isolation.

## 5. Register (if the project tracks a registry)

If the target project uses `ComponentRegistryProvider`, register the
result — category, variants, dependencies, `animated`, `respectsReducedMotion`,
and (since PR#2) `usageExample`/`documentationNotes` — so the next request
that needs something similar finds it in step 1.2 instead of triggering
another full search-and-merge pass. A component search that never checks
its own registry duplicates work; a registration nobody ever reads doesn't
help either — do both halves.

## Avoid duplicate functionality

This whole process exists to prevent two failure modes: rebuilding
something the repo already has (skipped by step 1), and shipping a second
near-identical component because the first was never registered or found
(fixed by step 5). If step 1 or step 1.2 finds a real match, extend it
rather than starting this process over.
