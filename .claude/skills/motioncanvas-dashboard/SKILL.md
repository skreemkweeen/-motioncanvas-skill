---
name: motioncanvas-dashboard
description: Use for dense internal tools, admin panels, analytics/data dashboards — tables, charts, filters, metric summaries, nav shells. Enforces the anti-generic-dashboard rules (no default sidebar+card+purple shape) before layout. Triggers on "dashboard", "admin panel", "internal tool", "analytics UI".
---

# MotionCanvas Dashboard (strict)

The gate-driven workflow scoped to dense, data-heavy internal UI — see
`../motioncanvas-core/SKILL.md` for the general version this specializes.
Everything referenced below lives in `../motioncanvas/` unless noted.

## Mandatory gate sequence

1. **ProjectProfile** — repo conventions, existing token/motion setup
   (`motioncanvas/analysis/project-profile.ts`). Always required.
2. **CreativeBrief** — who operates this daily, task frequency, data
   density, what a bad day using this tool looks like
   (`motioncanvas/analysis/creative-brief.ts`).
3. **VisualIdentity** — nav placement, density, and accent color decided
   from task frequency and this product's actual brand, not "the SaaS
   dashboard shape" (`motioncanvas/analysis/visual-identity.ts`,
   `motioncanvas/references/visual-identity-engine.md`). Originality score
   below 7 means revise before layout — see
   `examples/analytics-dashboard/README.md` for a worked, non-generic
   reference build.
4. **ComponentPlan** — sidebar/topbar/filter-bar/data-table/metric-card,
   sourced per `motioncanvas/SKILL.md`'s Component sourcing order; check
   `motioncanvas/snippets/components/` first (already-extracted, generalized
   versions of these exact pieces) before building new ones.
5. **MotionPlan** — dashboards run Low/Very-low intensity by default
   (`motioncanvas/references/execution-principles.md`'s Motion budget
   table) — viewport reveals fine, ambient/looping motion is not.
6. Implementation.
7. **DesignCritique** — `motioncanvas/references/execution-principles.md`
   plus the premium design quality gate in
   `motioncanvas/references/visual-identity-engine.md`. Verify empty/
   loading/error states are real, not just the happy path
   (`motioncanvas/references/quality-checklist.md`).

## Forbidden by default

The single most common failure mode this skill exists to prevent — see
`sidebar-card-purple-dashboard` in `KNOWN_GENERIC_PATTERNS`
(`motioncanvas/analysis/visual-identity.ts`):

- Fixed sidebar + card grid + purple/violet accent as the unexamined
  default, regardless of this product's actual brand or task frequency.
- Color-only status indicators with no text/icon backup (contrast/
  colorblind failure — `motioncanvas/references/quality-checklist.md`).
- Happy-path-only data (no empty/loading/error states shown).

## Scope

Covers internal tools, admin panels, and analytics dashboards. For a
marketing page, use `motioncanvas-landing`; for a design system/token
build, `motioncanvas-design-system`; to critique an existing dashboard
rather than build one, `motioncanvas-review`.
