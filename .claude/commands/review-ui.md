---
description: Critique existing UI using the strict MotionCanvas review workflow — review-only, no code changes unless asked
argument-hint: [what to review]
---

Invoke the `motioncanvas-review` skill (via the Skill tool) now, before
doing anything else. This is review-only — do not edit code unless the user
explicitly asks for fixes after seeing the findings. If it's ambiguous
whether they want a critique or a fix, ask first.

Read the actual code (and the rendered UI, if this session can run the app)
before writing a single finding — never critique from a component name or a
guess.

Score against `.claude/skills/motioncanvas/references/design-critique-mode.md`
(hierarchy, spacing, typography, color, responsiveness, accessibility,
motion, interaction states, performance, maintainability) and
`.claude/skills/motioncanvas/references/visual-identity-engine.md`'s AI
cliché list and `KNOWN_GENERIC_PATTERNS` — flag any generic pattern match
found in the existing UI (sidebar+card+purple dashboards, centered-hero+
gradient-blob pages, fabricated testimonials, etc.), not just accessibility/
performance issues.

Output format: findings grouped Blocking → High → Medium → Low, each with
location, what's wrong, why it matters, and a one-line suggested fix. Skip
empty groups. Never assert a numeric score unless a real tool (axe,
Lighthouse) actually ran.

What to review: $ARGUMENTS
