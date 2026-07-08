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

## Next: MotionCanvas Showcase, not more architecture

v1.0's architecture (provider/plugin layer, token compiler, review pipeline,
repo intelligence) is considered complete. Future work should improve the
UI this skill actually produces, not the machinery behind it. Before
starting any future PR, ask: **does this directly improve the UI a
developer receives?** If not, don't build it — that includes new
providers, registries, hooks, contexts, config files, or reference
documentation that doesn't accompany a concrete output-quality improvement.

The product framing for this phase: visitors don't adopt a skill because
they read its architecture docs — they adopt it because they can see a
concrete before/after and judge the difference themselves. `showcase/`
(added alongside this phase) is that visual proof, and it's also a real
verification step, not just documentation — rendering
`showcase/landing-page/`'s "after" side for the first time surfaced three
shipped bugs (a Tailwind key-casing mismatch, a component that silently
ignored its own documented usage, and invisible CTA text) that
`typecheck`/`lint` had no way to catch. Expect building each future
showcase to keep finding real issues, which is exactly why they're built
one at a time and reviewed for real, not generated in bulk to hit a count.

Priority areas for new showcases and capability work, roughly in order of
tractability — **one showcase per PR**, each with real captured
screenshots (`showcase/<name>/`), not a batch:

- Better landing pages (done: `showcase/landing-page/`)
- Better dashboards (done: `showcase/dashboard/`)
- Better SaaS apps
- Better design systems
- Better component modernization
- Better motion
- Better accessibility
- Better repository-aware refactoring

Every PR against one of these areas must include a concrete before/after
example (not just an assertion of improvement) demonstrating why the
change produces noticeably better output — see `examples/gallery/` for the
existing before/after-shaped walkthroughs to extend, `examples/ai-saas-landing/`
for the level of reasoning a real before/after comparison should show, and
`showcase/` for real rendered screenshots when a code-level comparison
alone doesn't make the difference legible.

A large template/component library (many verticals, many pre-built
sections) is explicitly **not** how this phase should proceed: building
many at once, to a genuine quality bar, each with a real captured
screenshot, isn't credible in one or two PRs — it's the fastest way back to
shallow, rushed output, the opposite of this phase's point. One showcase,
reviewed and bug-checked for real, beats ten generated to hit a count.

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
