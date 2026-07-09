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

## Next: output quality, not more architecture

v1.0's architecture (provider/plugin layer, token compiler, review pipeline,
repo intelligence) is considered complete. Future work should improve the
UI this skill actually produces, not the machinery behind it. Before
starting any future PR, ask: **does this directly improve the UI a
developer receives?** If not, don't build it — that includes new
providers, registries, hooks, contexts, config files, or reference
documentation that doesn't accompany a concrete output-quality improvement.

Priority areas, roughly in order of tractability:

- Better landing pages
- Better dashboards
- Better SaaS apps
- Better design systems
- Better component modernization
- Better motion
- Better accessibility
- Better repository-aware refactoring

Every PR against one of these areas must include a concrete before/after
example (not just an assertion of improvement) demonstrating why the
change produces noticeably better output — see `examples/gallery/` for the
existing before/after-shaped walkthroughs to extend, and
`examples/ai-saas-landing/` for the level of reasoning a real before/after
comparison should show.

Two specific, previously-listed ideas stay in scope under this framing
because they're genuinely about output quality, not new infrastructure:

- **AI-powered design critique with concrete refactoring suggestions** —
  extending `design-critique-mode.md`'s findings format to propose an actual
  diff, not just a description of the problem.
- **Automatic migration of an existing UI to this design system** — reading
  a target project's current tokens/components (via `analysis/`) and
  proposing a mapping onto `tokens/design-tokens.ts`'s scales, rather than
  a from-scratch rebuild.

Two ideas from the prior version of this roadmap are deferred, not
abandoned, because they're new infrastructure (a primitive category, a
provider integration) rather than an improvement to existing output:
motion timeline generation for page transitions, and Figma import/export.
Revisit them only if a specific before/after case can't be built without
them.

## Explicitly not planned

- A sandboxed/marketplace plugin system, or loading of untrusted
  third-party code — `plugins/README.md`'s scope (in-process, developer-
  supplied plugins) is deliberate, not a stepping stone to this.
- Live scraping of any design-inspiration site without an official API —
  `providers/README.md`'s local-catalog pattern is the honest ceiling for
  those sources, not a placeholder for scraping later.
