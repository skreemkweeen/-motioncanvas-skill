---
name: motioncanvas-review
description: Use when asked to critique, review, evaluate, grade, or audit EXISTING UI — not to build something new. Review-only; no code changes unless the user asks for fixes after seeing findings. Triggers on "review this component", "what's wrong with this page", "audit our design system", "critique this UI".
---

# MotionCanvas Review (strict)

Review-only mode — see `../motioncanvas-core/SKILL.md` and its siblings for
the build-side gate sequence this skill deliberately does not run
(CreativeBrief/VisualIdentity/ComponentPlan/MotionPlan don't apply to
evaluating something that already exists). Everything referenced below
lives in `../motioncanvas/` unless noted.

## Trigger check

If it's ambiguous whether the user wants a critique or a fix, ask — don't
guess and start editing. This skill produces findings, not diffs.

## Mandatory gate sequence

1. **ProjectProfile** — read the actual code (and the rendered UI, if this
   session can run the app) before writing a single finding — never
   critique from a component name or a guess
   (`motioncanvas/analysis/project-profile.ts`).
2. **DesignCritique** — the full pass:
   `motioncanvas/references/design-critique-mode.md` (what to review: hierarchy,
   spacing, typography, color, responsiveness, accessibility, motion,
   interaction states, performance, maintainability), scored against
   `motioncanvas/references/quality-checklist.md` and
   `motioncanvas/references/visual-identity-engine.md`'s AI cliché list —
   flag any `KNOWN_GENERIC_PATTERNS` match found in the existing UI, too.

## Output format

Findings grouped Blocking → High → Medium → Low
(`motioncanvas/references/design-critique-mode.md`'s exact format — location,
what's wrong, why it matters, suggested one-line fix). Skip empty groups.
Never assert a numeric score unless a real tool (axe, Lighthouse) actually
ran.

## After the critique

If the user asks for fixes, switch to whichever `motioncanvas-*` skill
matches the surface (`motioncanvas-dashboard`, `motioncanvas-landing`, or
`motioncanvas-core`) and treat each accepted finding as a requirement — run
its full gate sequence on the fix, don't just patch and skip VisualIdentity/
DesignCritique because "it's just a fix."

## Scope

Existing UI only. For a new build, use `motioncanvas-core` or the matching
specialized skill.
