# Changelog

All notable changes to this skill are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); see
`CONTRIBUTING.md`'s "Versioning" section for what major/minor/patch mean for
a repo with no published package.

## [1.0.0] - 2026-07-08

First tracked release. This repo had no prior tagged version — everything
below is the cumulative state of the skill as of this release, not a diff
against an earlier public version.

### Added

- The core `SKILL.md` workflow (intent → research → planning → design
  system → components → motion → review → code), with
  `references/intent-taxonomy.md`'s eleven request categories backing the
  first stage.
- A twelve-primitive motion library (`snippets/motion/`) plus eight named
  motion presets, built on a shared `MotionProvider`/reduced-motion context.
- Repository intelligence (`analysis/project-profile.ts`) and creative-brief
  generation (`analysis/creative-brief.ts`).
- A seven-lens review pipeline and a review-only design critique mode.
- A provider architecture (`providers/`) — real implementations for
  component registry, motion catalog, a local-JSON design-inspiration
  pattern, a real Figma REST client, and real local Spline asset resolution;
  `TemplateProvider` remains interface-only.
- A real, executed in-process plugin runtime (`plugins/`) wrapping those
  providers — registration, dependency resolution, version compatibility,
  config validation, filesystem discovery — verified by
  `npm run plugins:smoke`.
- A design-token compiler (`tokens/`) — one source of truth compiled to
  CSS/Tailwind/TypeScript/JSON via `npm run tokens:build`.
- A command-registry catalog (`commands/`) with a drift validator
  (`npm run validate:registry`).
- One complete worked reference build (`examples/ai-saas-landing/`) and a
  7-walkthrough example gallery (`examples/gallery/`) covering dashboard,
  component modernization, design critique, motion enhancement, design
  system generation, and repository analysis.
- `references/api-reference.md` (every exported symbol, classified
  Public/Internal/Interface-only) and `references/release-audit.md`
  (capability classification, stability findings, measured performance
  numbers).
- Issue and PR templates (`.github/`), a minimal CI workflow running this
  repo's own verification scripts, and this changelog.

### Fixed

- `providers/local-component-registry.ts`, `providers/local-motion-library.ts`,
  and `analysis/intent-taxonomy.ts`'s `INTENT_CATEGORIES` were typechecked
  but never exercised by anything — now covered by real assertions in
  `plugins/examples/run-smoke.ts`.
- A near-duplicate directory-layout description in `README.md` (now a short
  pointer to `CLAUDE.md`'s fuller version) and two stray uses of "adapter"
  where "provider" is the term used everywhere else.
