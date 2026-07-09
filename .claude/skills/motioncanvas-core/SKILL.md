---
name: motioncanvas-core
description: The default, strict entry point for building or upgrading UI in a React/Next.js codebase — components, pages, apps — when no more specific motioncanvas-* skill fits better. Use motioncanvas-dashboard for dense internal/admin UI, motioncanvas-landing for marketing pages, motioncanvas-review to critique existing UI, motioncanvas-motion for animation-only requests, and motioncanvas-design-system for tokens/component-library work. Triggers on "build a UI", "build an app", "add a page", "build a component".
---

# MotionCanvas Core (strict)

The general-purpose, gate-driven workflow. Run every gate below in order and
state each artifact to the user in a few lines — this is not optional and
not a documentation index to skim; skipping a gate to get to code faster is
the failure mode this skill exists to prevent. Everything referenced below
lives in `../motioncanvas/` (the shared library) unless noted otherwise.

## Mandatory gate sequence

Scale depth to request size (a single button skips gates 2–4; a full app
runs all seven) — but never skip a gate silently. Say which ones you're
skipping and why.

1. **ProjectProfile** — read the target repo's framework, styling system,
   component library, motion setup, and conventions
   (`motioncanvas/analysis/project-profile.ts`, `motioncanvas/analysis/README.md`).
   Always required, even for a single component.
2. **CreativeBrief** — goals, constraints, audience, visual style,
   interaction model, accessibility/performance targets, animation strategy
   (`motioncanvas/analysis/creative-brief.ts`). Required for anything beyond
   a single component.
3. **VisualIdentity** — concept, visual DNA, signature element, and an
   originality score against `motioncanvas/references/visual-identity-engine.md`'s
   rubric (`motioncanvas/analysis/visual-identity.ts`). Required before any
   layout decision. A score below 7 means revise the concept now, not ship
   it with a caveat.
4. **ComponentPlan** — which components come from the repo, Shadcn/Radix,
   a known pattern reimplemented, or scratch-built
   (`motioncanvas/SKILL.md`'s Component sourcing order,
   `motioncanvas/references/component-composition.md`). Required before
   writing code.
5. **MotionPlan** — a preset (`motioncanvas/references/motion-director.md`)
   or an explicit "no motion here" decision
   (`motioncanvas/references/motion-principles.md`'s "when not to animate").
   Required before adding any animation.
6. Implementation.
7. **DesignCritique** — the full pass in
   `motioncanvas/references/execution-principles.md` plus
   `motioncanvas/references/visual-identity-engine.md`'s premium design
   quality gate. Required before returning anything. Fix in-scope issues,
   don't just note them.

## Forbidden by default

Never ship these unless the user names them explicitly — full list and why
in `motioncanvas/references/visual-identity-engine.md`:

- Any pattern in `KNOWN_GENERIC_PATTERNS`
  (`motioncanvas/analysis/visual-identity.ts`) — sidebar+card+purple
  dashboards, centered-hero+gradient-blob landing pages, generic 3-tier
  pricing, bento-grid-as-default, blanket glassmorphism, fabricated
  testimonials.
- Marketing-generic copy ("Supercharge your workflow", "Unlock your
  potential").

## Scope

If the request is clearly a dashboard/admin surface, a marketing/landing
page, motion-only, a design-system/token build, or a critique of existing
UI, use the matching sibling skill instead — each scopes the same gate
sequence tighter to that domain. Use this skill when none of those fit, or
the request spans more than one.
