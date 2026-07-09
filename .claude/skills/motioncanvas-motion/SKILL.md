---
name: motioncanvas-motion
description: Use when the request is specifically about motion/animation on UI that already exists — adding, removing, or tuning animation, micro-interactions, or transitions, without a full new-build pipeline. Triggers on "add animation", "make this feel more premium/alive", "add micro-interactions", "this feels janky".
---

# MotionCanvas Motion (strict)

The gate-driven workflow scoped to animation-only requests — see
`../motioncanvas-core/SKILL.md` for the full-build version. Skips
CreativeBrief/VisualIdentity/ComponentPlan since the UI structure already
exists; this skill only touches motion. Everything referenced below lives
in `../motioncanvas/` unless noted.

## Mandatory gate sequence

1. **ProjectProfile** — what's already installed (Framer Motion/GSAP/
   neither), existing `prefers-reduced-motion` handling, existing motion
   density — never add a second motion system alongside one that already
   works (`motioncanvas/analysis/project-profile.ts`).
2. **MotionPlan** — pick one named preset
   (`motioncanvas/references/motion-director.md`) or, if the ask is "remove
   janky animation," identify exactly what to cut and why
   (`motioncanvas/references/motion-principles.md`'s "when not to animate").
   State the plan before touching code: which elements, which primitive
   (`motioncanvas/snippets/motion/README.md`), what state change each
   animation communicates.
3. Implementation — copy the relevant primitive in
   (`motioncanvas/snippets/motion/`) rather than hand-rolling a new
   animation function; respect the motion budget for this surface
   (`motioncanvas/references/execution-principles.md`'s table — a dashboard
   gets Low, a landing hero can go Medium–High).
4. **DesignCritique** — re-check against
   `motioncanvas/references/motion-principles.md` and
   `motioncanvas/references/quality-checklist.md`'s Accessibility/
   Performance sections: does every animation still answer why it's moving;
   is `prefers-reduced-motion` respected (see
   `motioncanvas/snippets/motion/no-js.css` and `no-js-guard.tsx` if the
   primitive renders SSR-hidden content); does this stay within the
   surface's motion budget.

## Forbidden by default

- Motion with no state-change justification — decoration for its own sake.
- Ambient/looping motion on dashboards, admin panels, forms, or
  authentication surfaces (Very low/Minimal budget —
  `motioncanvas/references/execution-principles.md`).
- A new animation library alongside one the repo already has installed.
- Animating `width`/`height`/`top`/`left` instead of `transform`/`opacity`.

## Scope

Motion changes to existing UI only. If the request also needs new
components or layout, hand off to `motioncanvas-core` or the matching
specialized skill — this one assumes structure already exists.
