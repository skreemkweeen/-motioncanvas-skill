---
name: motioncanvas-landing
description: Use for marketing/landing pages, hero sections, pricing pages, SaaS product pages — persuasive single-page or few-page sites meant to convert a visitor. Enforces the anti-generic-landing-page rules (no default centered-hero+gradient-blob shape) before layout. Triggers on "landing page", "hero section", "marketing site", "pricing page".
---

# MotionCanvas Landing (strict)

The gate-driven workflow scoped to persuasive marketing pages — see
`../motioncanvas-core/SKILL.md` for the general version this specializes.
Everything referenced below lives in `../motioncanvas/` unless noted.

## Mandatory gate sequence

1. **ProjectProfile** — repo conventions, existing token/motion setup
   (`motioncanvas/analysis/project-profile.ts`). Always required.
2. **CreativeBrief** — the one action this page needs a visitor to take,
   the audience's actual skepticism/motivation, real constraints
   (`motioncanvas/analysis/creative-brief.ts`).
3. **VisualIdentity** — concept and signature element before hero layout;
   check symmetry/gradient/copy choices against
   `motioncanvas/references/visual-identity-engine.md`'s AI cliché list
   specifically (`motioncanvas/analysis/visual-identity.ts`). Originality
   score below 7 means revise before layout — see
   `examples/ai-saas-landing/README.md` for a worked, non-generic reference
   build, including what was deliberately left out (fabricated
   testimonials, an unrequested pricing table).
4. **ComponentPlan** — hero/feature-grid/cta sourced per
   `motioncanvas/SKILL.md`'s Component sourcing order; check
   `motioncanvas/snippets/components/` (HeroSection, FeatureGrid, CtaSection,
   Navbar) before building new ones.
5. **MotionPlan** — Medium–High intensity is the budget, not a license for
   motion everywhere (`motioncanvas/references/execution-principles.md`'s
   Motion budget table); one accent moment in the hero, quieter viewport
   reveals elsewhere (`motioncanvas/references/motion-principles.md`).
6. Implementation.
7. **DesignCritique** — `motioncanvas/references/execution-principles.md`
   plus the premium design quality gate in
   `motioncanvas/references/visual-identity-engine.md`.

## Forbidden by default

See `centered-hero-gradient-blob` and `generic-three-tier-pricing` in
`KNOWN_GENERIC_PATTERNS` (`motioncanvas/analysis/visual-identity.ts`):

- Centered hero, eyebrow pill, gradient blob, two-button CTA as the
  unexamined default regardless of audience or product.
- A pricing section with invented tiers/numbers when none were provided.
- A testimonial carousel with fabricated quotes/avatars.
- Marketing-generic copy ("Unlock your potential", "The future of X,
  today") in place of language specific to this product.

## Scope

Covers marketing pages, hero sections, and pricing pages. For a dense
internal tool, use `motioncanvas-dashboard`; for a design system/token
build, `motioncanvas-design-system`; to critique an existing page rather
than build one, `motioncanvas-review`.
