/**
 * Structured defaults for the eleven request categories this skill
 * recognizes — the data half of the intent-classification stage described
 * in references/intent-taxonomy.md. Classification itself is the agent's
 * own reasoning (matching a request to the closest category, or asking if
 * none fits); this file is what it consults once a category is chosen, the
 * same relationship analysis/project-profile.ts has to the repo-reading
 * step.
 */

import type { MotionPresetName } from "../snippets/motion/presets.js";

/**
 * Some categories don't have one preset (a design system ships tokens, not
 * a commitment; a single component should inherit whatever the surrounding
 * product already uses) — these two values cover those honestly instead of
 * forcing a pick from the eight named presets.
 */
export type MotionPresetRecommendation =
  MotionPresetName | "inherit-existing" | "not-applicable";

export type IntentCategoryId =
  | "landing-page"
  | "dashboard"
  | "saas-product"
  | "marketplace"
  | "admin-panel"
  | "portfolio"
  | "mobile-app"
  | "design-system"
  | "component"
  | "animation-request"
  | "ui-review";

export interface IntentCategory {
  id: IntentCategoryId;
  name: string;
  description: string;
  typicalAudience: string;
  coreFeatures: readonly string[];
  informationArchitecture: string;
  layoutStrategy: string;
  recommendedMotionPreset: MotionPresetRecommendation;
  recommendedPrimitives: readonly string[];
  notes: string;
}

export const INTENT_CATEGORIES: readonly IntentCategory[] = [
  {
    id: "landing-page",
    name: "Landing page",
    description:
      "A single marketing page whose job is to convert a visitor into a signup/demo/purchase.",
    typicalAudience:
      "A cold or warm visitor comparing options, skimming before committing time.",
    coreFeatures: [
      "Hero with one clear value proposition",
      "Feature/benefit section",
      "Social proof (logos, testimonials, numbers)",
      "Pricing, if applicable",
      "One primary CTA repeated at natural decision points",
    ],
    informationArchitecture:
      "Single scrollable page, strict top-to-bottom priority order (value prop -> proof -> detail -> CTA), no nested navigation.",
    layoutStrategy:
      "Asymmetric hero, generous whitespace, three to four sections before the ask repeats.",
    recommendedMotionPreset: "stripe",
    recommendedPrimitives: [
      "HeroReveal",
      "AuroraBackground (hero only)",
      "Reveal",
      "StaggerContainer/StaggerItem",
      "SpotlightFollow (feature cards)",
    ],
    notes:
      "Override the preset by actual audience: consumer/casual -> playful; enterprise/compliance-heavy -> enterprise. See examples/ai-saas-landing/ as a worked build.",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description:
      "Data-dense internal or customer-facing view for monitoring or acting on live data.",
    typicalAudience:
      "A returning, trained user who values speed and information density over persuasion.",
    coreFeatures: [
      "Key metrics/summary row",
      "Primary data table or chart",
      "Filters/date range controls",
      "Empty/loading/error states for every data region",
    ],
    informationArchitecture:
      "Persistent nav (sidebar or top bar) plus content area; hierarchy by glance-value.",
    layoutStrategy: "Grid-based, dense, consistent card sizing; no hero section.",
    recommendedMotionPreset: "enterprise",
    recommendedPrimitives: [
      "Fade (data refresh)",
      "skeleton loading states over spinners where possible",
    ],
    notes:
      "Avoid AuroraBackground/CursorGlow/FloatingCard entirely — see the enterprise preset's interactionNotes.",
  },
  {
    id: "saas-product",
    name: "SaaS product",
    description:
      "A multi-surface application (marketing site + app + settings) sold as a subscription.",
    typicalAudience:
      "Spans first-time evaluators (marketing site) and daily active users (in-app) — different motion needs per surface.",
    coreFeatures: [
      "Marketing site (landing-page category)",
      "Onboarding flow",
      "Core app (dashboard-like)",
      "Billing/settings",
    ],
    informationArchitecture:
      "Distinct IA per surface — don't reuse the marketing site's persuasive structure inside the app.",
    layoutStrategy:
      "Marketing surfaces follow the landing-page strategy; app surfaces follow the dashboard strategy.",
    recommendedMotionPreset: "inherit-existing",
    recommendedPrimitives: ["See the landing-page and dashboard entries"],
    notes:
      "This category is really a composite — classify each surface being built against landing-page or dashboard rather than treating 'SaaS' as its own motion identity.",
  },
  {
    id: "marketplace",
    name: "Marketplace",
    description:
      "Two-sided platform connecting buyers/sellers or supply/demand — listings, search, transactions.",
    typicalAudience:
      "A browsing/comparison-shopping user; trust and scannability matter more than persuasion.",
    coreFeatures: [
      "Search/filter",
      "Listing grid/list toggle",
      "Listing detail page",
      "Trust signals (reviews, verification)",
      "Transaction/contact flow",
    ],
    informationArchitecture:
      "Search-first IA; category/filter navigation is the primary structure, not a linear scroll.",
    layoutStrategy:
      "Grid-based listing cards, persistent filter sidebar or top bar, minimal above-the-fold hero.",
    recommendedMotionPreset: "minimal",
    recommendedPrimitives: [
      "StaggerContainer for listing grids, short stagger only",
      "SpotlightFollow sparingly",
      "Fade for filter result updates",
    ],
    notes:
      "Don't stagger large result grids beyond ~12 visible items — the cumulative delay reads as slow, not polished.",
  },
  {
    id: "admin-panel",
    name: "Admin panel",
    description:
      "Internal tool for managing records/config — CRUD-heavy, an audience of one (the operator).",
    typicalAudience:
      "A trained internal operator; efficiency and error-prevention matter far more than visual delight.",
    coreFeatures: [
      "Record list with search/sort/bulk actions",
      "Create/edit forms with validation",
      "Audit/activity log",
      "Role/permission-gated actions",
    ],
    informationArchitecture:
      "Sidebar nav by resource type; breadcrumbs for nested records.",
    layoutStrategy:
      "Dense tables, minimal decoration, forms follow platform conventions over novel patterns.",
    recommendedMotionPreset: "minimal",
    recommendedPrimitives: [
      "Fade only",
      "instant state changes for destructive-action confirmations",
    ],
    notes:
      "The one category where near-zero motion is the correct choice, not a compromise.",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description:
      "A person or studio's showcase of work, meant to get them hired/commissioned.",
    typicalAudience:
      "A prospective client or employer skimming quickly, partly judging craft through the site's own execution.",
    coreFeatures: [
      "Work/project grid",
      "Case study / project detail pages",
      "About/bio",
      "Contact",
    ],
    informationArchitecture:
      "Visual-first grid as home; each project as its own detailed narrative page.",
    layoutStrategy:
      "Large imagery, generous whitespace, minimal chrome — the work is the content.",
    recommendedMotionPreset: "editorial",
    recommendedPrimitives: [
      "ScrollReveal",
      "Reveal",
      "FloatingCard for a single hero piece",
      "HeroReveal for the intro",
    ],
    notes:
      "The site's own motion quality is part of the pitch — hold it to a higher bar, but stay restrained (editorial or luxury, not playful, unless the work itself is explicitly playful).",
  },
  {
    id: "mobile-app",
    name: "Mobile app (or mobile-first web UI)",
    description:
      "A primarily single-column, touch-driven interface — a mobile-first responsive web app, or conceptually a native app screen.",
    typicalAudience:
      "A user operating one-handed, expecting native-feeling touch feedback and low latency.",
    coreFeatures: [
      "Bottom tab or hamburger navigation",
      "Single-column content",
      "Touch-target sizing (44px+ minimum)",
      "Pull-to-refresh / native-feeling transitions where applicable",
    ],
    informationArchitecture: "Shallow hierarchy (two to three levels max).",
    layoutStrategy:
      "Single column, bottom-anchored primary actions for thumb reach, generous touch targets.",
    recommendedMotionPreset: "apple",
    recommendedPrimitives: [
      "Slide for sheet/modal presentation",
      "spring-based transitions over linear eases",
      "skip useMagneticButton on touch-primary surfaces — it has no hover to key off of",
    ],
    notes:
      "Honest caveat: this skill's primitives (snippets/motion/) are Framer Motion for the DOM — they apply directly to a mobile-first web app, not to React Native. For an actual React Native build, use this category's strategic guidance (IA, layout, motion feel) but implement with React Native's own animation tooling, not these snippets.",
  },
  {
    id: "design-system",
    name: "Design system",
    description:
      "The tokens/components/documentation meant to be reused across many products, not a single UI.",
    typicalAudience:
      "Other engineers/designers consuming the system — the primary user is a builder, not an end customer.",
    coreFeatures: [
      "Token set (see tokens/design-tokens.ts's pattern)",
      "Component library with documented variants",
      "Usage guidelines",
      "Accessibility contract per component",
    ],
    informationArchitecture: "Organized by component category, not by product flow.",
    layoutStrategy:
      "Not applicable at the product-page level — see tokens/ and providers/component-registry-provider.ts's metadata shape for what to document per component.",
    recommendedMotionPreset: "not-applicable",
    recommendedPrimitives: [
      "The whole snippets/motion/ library is the deliverable here, not a subset",
    ],
    notes:
      "This category's output is largely the tooling in this skill's own snippets/providers/tokens directories, adapted into the target project's own package — not new UI.",
  },
  {
    id: "component",
    name: "Single component",
    description: "One component or small composed unit, not a page.",
    typicalAudience: "Inherits whatever the surrounding product's audience is.",
    coreFeatures: ["Not applicable — scope is exactly what's asked, not a checklist"],
    informationArchitecture: "Not applicable.",
    layoutStrategy:
      "Match the surrounding page/product's existing conventions; don't introduce a new pattern for one component.",
    recommendedMotionPreset: "inherit-existing",
    recommendedPrimitives: [
      "Whichever single primitive fits — see snippets/motion/README.md",
    ],
    notes:
      "The 'don't over-plan' category — every motioncanvas-* skill's own proportionality rule (\"a single button doesn't need a wireframe phase\") applies directly. Skip the intent-taxonomy/creative-brief/visual-identity gates entirely for a true single-component ask.",
  },
  {
    id: "animation-request",
    name: "Animation-only request",
    description:
      "The ask is purely to add/change motion on already-built UI, not build new UI.",
    typicalAudience: "Not applicable.",
    coreFeatures: ["Not applicable"],
    informationArchitecture: "Not applicable.",
    layoutStrategy: "Do not touch layout/markup beyond what the animation itself needs.",
    recommendedMotionPreset: "inherit-existing",
    recommendedPrimitives: [
      "Depends entirely on the specific ask — read motion-principles.md's 'when not to animate' before adding anything",
    ],
    notes:
      "The most common failure mode here is adding motion beyond the specific element mentioned — scope tightly.",
  },
  {
    id: "ui-review",
    name: "UI review / critique",
    description: "The ask is to evaluate existing UI, not build anything.",
    typicalAudience: "Not applicable.",
    coreFeatures: ["Not applicable"],
    informationArchitecture: "Not applicable.",
    layoutStrategy: "Not applicable.",
    recommendedMotionPreset: "not-applicable",
    recommendedPrimitives: ["Not applicable"],
    notes:
      "Switch to references/design-critique-mode.md immediately — this taxonomy is for the build workflow and doesn't apply.",
  },
];
