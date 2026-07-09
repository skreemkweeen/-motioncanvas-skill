---
name: motioncanvas-design-system
description: Use when asked to build or extend a design system, token set, or shared component library itself — not a specific page/dashboard, the underlying visual system those are built from. Triggers on "design system", "design tokens", "component library", "build a UI kit".
---

# MotionCanvas Design System (strict)

The gate-driven workflow scoped to the underlying visual system rather than
one surface built from it — see `../motioncanvas-core/SKILL.md` for the
general version. Everything referenced below lives in `../motioncanvas/`
unless noted.

## Mandatory gate sequence

1. **ProjectProfile** — existing tokens, component library, and naming
   conventions (`motioncanvas/analysis/project-profile.ts`) — extend what's
   there before introducing a parallel system.
2. **CreativeBrief** — what this system needs to support (how many
   products/surfaces, light/dark, brand constraints)
   (`motioncanvas/analysis/creative-brief.ts`).
3. **VisualIdentity** — the visual DNA the whole system will express (color
   direction, typographic voice, motion personality), not per-component
   decisions made independently later
   (`motioncanvas/analysis/visual-identity.ts`,
   `motioncanvas/references/visual-identity-engine.md`). Originality score
   below 7 means revise before generating tokens — a generic token set
   produces generic UI everywhere it's used.
4. **ComponentPlan** — which components the system actually needs, sourced
   per `motioncanvas/SKILL.md`'s Component sourcing order; check
   `motioncanvas/snippets/components/` (the already-extracted, generalized
   library) before building new ones; see `motioncanvas/tokens/README.md`
   for the token compiler (one source of truth → CSS/Tailwind/TypeScript/
   JSON, `npm run tokens:build` in this repo, or the equivalent in the
   target project).
5. **MotionPlan** — pick or define preset(s)
   (`motioncanvas/references/motion-director.md`,
   `motioncanvas/snippets/motion/presets.ts`) as part of the system, not
   left for each future consumer to invent independently.
6. Implementation.
7. **DesignCritique** — `motioncanvas/references/execution-principles.md`
   plus `motioncanvas/references/visual-identity-engine.md`'s premium
   design quality gate, applied to the system's own primitives/docs, not
   just one page built from them.

## Forbidden by default

- Copying a well-known design system's tokens/component names verbatim
  (Material, Chakra, Ant) instead of deriving values from this product's
  own VisualIdentity.
- Any `KNOWN_GENERIC_PATTERNS` match baked into a shared component that
  every future consumer then inherits by default
  (`motioncanvas/analysis/visual-identity.ts`).
- A second parallel token system alongside one the repo already has.

## Scope

The system itself — tokens, shared components, motion presets. For a
specific page/dashboard built from an existing system, use
`motioncanvas-core` or the matching specialized skill.
