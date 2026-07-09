---
description: Build a marketing/landing page using the strict MotionCanvas workflow, without the default centered-hero+gradient-blob shape
argument-hint: [product/audience/what the page needs to do]
---

Invoke the `motioncanvas-landing` skill (via the Skill tool) now, before
doing anything else.

Follow its mandatory gate sequence in order: ProjectProfile, CreativeBrief,
VisualIdentity, ComponentPlan, MotionPlan, implementation, DesignCritique.
Do not skip ProjectProfile. Do not write the hero layout before
VisualIdentity is stated — concept and signature element come first, the
gradient/copy/layout choices follow from them, not the reverse.

Forbidden by default unless explicitly requested by name (see
`.claude/skills/motioncanvas/references/visual-identity-engine.md`):

- Centered hero, eyebrow pill, gradient blob, two-button CTA as the
  unexamined default.
- A pricing section with invented tiers/numbers when none were provided.
- A testimonial carousel with fabricated quotes/avatars.
- Marketing-generic copy ("Unlock your potential", "The future of X,
  today") in place of language specific to this product.

Before implementation, state an originality score (0–10, from
`visual-identity-engine.md`'s rubric). A score below 7 means revise the
concept before continuing — don't ship the generic shape with a caveat.

Check `.claude/skills/motioncanvas/examples/ai-saas-landing/` for a worked,
non-generic reference build before starting, including what it deliberately
left out and why.

What the page needs to do: $ARGUMENTS
