# Roadmap

Where this skill's architecture stands and what comes after it. Nothing in
this file describes a feature that already exists — if it's listed here,
it's future work; see `references/architecture.md` and `providers/README.md`
for what's actually built today.

## Foundation (built)

- The core skill workflow (`SKILL.md`), design-system/motion-principles
  references, and a self-review checklist.
- A twelve-primitive motion library plus eight curated motion presets.
- Repository intelligence (`analysis/`) — a structured `ProjectProfile`.
- A formalized review pipeline (seven named lenses) and a review-only
  design-critique mode.
- A provider architecture (`providers/`) with real implementations where a
  real integration or an honest local-data pattern exists.
- A plugin runtime (`plugins/`) — registration, dependency resolution,
  version compatibility, config validation, filesystem discovery — wrapping
  those providers, all exercised by a real smoke test.
- A design-token compiler (`tokens/`) with one source of truth compiling to
  CSS/Tailwind/TypeScript/JSON.
- A command-registry catalog (`commands/`) with a drift validator.

## Next: creative capabilities, not more foundation

The next phase should mostly _use_ the architecture above rather than keep
extending it. In roughly the order they'd become tractable:

- **AI-powered design critique with concrete refactoring suggestions** —
  extending `design-critique-mode.md`'s findings format to propose an actual
  diff, not just a description of the problem.
- **Automatic migration of an existing UI to this design system** — reading
  a target project's current tokens/components (via `analysis/`) and
  proposing a mapping onto `tokens/design-tokens.ts`'s scales, rather than
  a from-scratch rebuild.
- **Component composition from multiple sources into one implementation** —
  e.g., combining a layout pattern from one `DesignInspirationProvider`
  result with a motion treatment from `snippets/motion/`, with the
  composition decision documented the way `examples/ai-saas-landing/`
  documents its choices.
- **Motion timeline generation for page transitions and storytelling** —
  a genuinely new primitive category (sequencing across route changes, not
  just within one component), which would need its own honest scoping pass
  the way `snippets/motion/` got one.
- **Figma import/export**, building on `figma-design-inspiration-provider.ts`
  — that provider currently only reads component metadata via the official
  REST API; two-way sync or file generation would be new scope, not an
  extension of what's there, and should only be built against Figma's
  actually-documented capabilities (see their Plugin/REST API docs), never
  assumed.
- **Advanced template generation** on top of the now-stable plugin/provider
  architecture — more reference examples like `examples/ai-saas-landing/`,
  promoted into a real `TemplateProvider` implementation once there are
  enough to justify the abstraction (see `providers/template-provider.ts`'s
  doc comment).

## Explicitly not planned

- A sandboxed/marketplace plugin system, or loading of untrusted
  third-party code — `plugins/README.md`'s scope (in-process, developer-
  supplied plugins) is deliberate, not a stepping stone to this.
- Live scraping of any design-inspiration site without an official API —
  `providers/README.md`'s local-catalog pattern is the honest ceiling for
  those sources, not a placeholder for scraping later.
