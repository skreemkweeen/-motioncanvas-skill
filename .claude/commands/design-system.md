---
description: Build or extend a design system, token set, or shared component library using the strict MotionCanvas workflow
argument-hint: [what the system needs to support]
---

Invoke the `motioncanvas-design-system` skill (via the Skill tool) now,
before doing anything else. This is for the underlying system itself — for
one page/dashboard built from an existing system, invoke `motioncanvas-core`
or the matching specialized skill instead.

Follow its mandatory gate sequence in order: ProjectProfile, CreativeBrief,
VisualIdentity, ComponentPlan, MotionPlan, implementation, DesignCritique.
Do not skip ProjectProfile — extend existing tokens/components before
introducing a parallel system. Do not generate tokens before VisualIdentity
is stated — a generic token set produces generic UI everywhere it's used
downstream.

Forbidden by default unless explicitly requested by name (see
`.claude/skills/motioncanvas/references/visual-identity-engine.md`):

- Copying a well-known design system's tokens/component names verbatim
  (Material, Chakra, Ant) instead of deriving values from this product's
  own VisualIdentity.
- Any `KNOWN_GENERIC_PATTERNS` match baked into a shared component that
  every future consumer then inherits by default.
- A second parallel token system alongside one the repo already has.

Before implementation, state an originality score (0–10, from
`visual-identity-engine.md`'s rubric) for the system's VisualIdentity. A
score below 7 means revise before generating tokens/components.

Check `.claude/skills/motioncanvas/tokens/README.md` for the token compiler
pattern (single source of truth → CSS/Tailwind/TypeScript/JSON) before
hand-rolling a new one.

What the system needs to support: $ARGUMENTS
