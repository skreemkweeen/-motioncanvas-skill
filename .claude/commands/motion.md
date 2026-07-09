---
description: Add, remove, or tune animation on existing UI using the strict MotionCanvas motion workflow
argument-hint: [what needs motion, or what feels janky]
---

Invoke the `motioncanvas-motion` skill (via the Skill tool) now, before
doing anything else. This assumes the UI structure already exists — if the
request also needs new components or layout, invoke `motioncanvas-core` or
the matching specialized skill instead.

Follow its mandatory gate sequence: ProjectProfile (what's already
installed, existing `prefers-reduced-motion` handling — never add a second
motion system alongside one that already works), MotionPlan (one named
preset from `.claude/skills/motioncanvas/references/motion-director.md`, or
an explicit "cut this" decision), implementation, DesignCritique.

State the MotionPlan before touching code: which elements, which primitive
(`.claude/skills/motioncanvas/snippets/motion/`), what state change each
animation communicates.

Forbidden by default:

- Motion with no state-change justification — decoration for its own sake.
- Ambient/looping motion on dashboards, admin panels, forms, or
  authentication surfaces.
- A new animation library alongside one the repo already has installed.
- Animating `width`/`height`/`top`/`left` instead of `transform`/`opacity`.

Respect the motion-budget table for this surface
(`.claude/skills/motioncanvas/references/execution-principles.md`) before
picking an intensity.

What needs motion: $ARGUMENTS
