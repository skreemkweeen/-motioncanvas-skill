---
description: Build a dense internal tool/admin/analytics dashboard using the strict MotionCanvas workflow, without the default sidebar+card+purple shape
argument-hint: [what the dashboard needs to show/do]
---

Invoke the `motioncanvas-dashboard` skill (via the Skill tool) now, before
doing anything else.

Follow its mandatory gate sequence in order: ProjectProfile, CreativeBrief,
VisualIdentity, ComponentPlan, MotionPlan, implementation, DesignCritique.
Do not skip ProjectProfile. Do not decide nav placement, density, or accent
color before VisualIdentity is stated — task frequency and this product's
actual brand decide those, not a template default.

Forbidden by default unless explicitly requested by name (see
`.claude/skills/motioncanvas/references/visual-identity-engine.md`):

- Fixed sidebar + card grid + purple/violet accent as the unexamined
  default dashboard shape.
- Color-only status indicators with no text/icon backup.
- Happy-path-only data with no empty/loading/error states.

Before implementation, state an originality score (0–10, from
`visual-identity-engine.md`'s rubric). A score below 7 means revise the
concept before continuing — don't ship the generic shape with a caveat.

Check `.claude/skills/motioncanvas/examples/analytics-dashboard/` for a
worked, non-generic reference build before starting.

What the dashboard needs: $ARGUMENTS
