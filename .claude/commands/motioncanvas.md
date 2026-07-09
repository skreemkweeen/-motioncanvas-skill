---
description: Build or upgrade UI using the strict, gate-driven MotionCanvas workflow (general entry point)
argument-hint: [what to build]
---

Invoke the `motioncanvas-core` skill (via the Skill tool) now, before doing
anything else. If the request is clearly a dashboard/admin surface, a
marketing/landing page, animation-only, a design-system/token build, or a
critique of existing UI, invoke `motioncanvas-dashboard`,
`motioncanvas-landing`, `motioncanvas-motion`, `motioncanvas-design-system`,
or `motioncanvas-review` instead — whichever fits best.

Follow that skill's mandatory gate sequence in order. Do not skip
ProjectProfile. Do not write layout or code before VisualIdentity and
ComponentPlan are stated, however briefly. Do not add motion before
MotionPlan. Do not return the result without running DesignCritique.

Forbidden by default unless explicitly requested by name (see
`.claude/skills/motioncanvas/references/visual-identity-engine.md`):

- Sidebar + card grid + purple/violet accent as the default dashboard shape.
- Centered hero + gradient blob + two-button CTA as the default landing
  page shape.
- Generic 3-tier pricing tables, bento grids as default layout, blanket
  glassmorphism, fabricated testimonials.
- Marketing-generic copy in place of language specific to this product.

Before implementation, state an originality score (0–10, from
`visual-identity-engine.md`'s rubric) for the VisualIdentity gate. A score
below 7 means revise the concept — don't implement a generic default and
report the low number as a caveat.

User's request: $ARGUMENTS
