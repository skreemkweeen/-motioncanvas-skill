# -motioncanvas-skill

This repo holds a family of Claude Code Skills. `.claude/skills/motioncanvas/`
is the shared reference library (instructions + reference docs + reusable
motion snippets + a small provider abstraction + worked reference examples) —
not typically triggered directly. Six installable skills
(`motioncanvas-core`, `motioncanvas-dashboard`, `motioncanvas-landing`,
`motioncanvas-review`, `motioncanvas-motion`, `motioncanvas-design-system`),
each a single `SKILL.md` under 150 lines, draw on that library to enforce a
strict, gate-driven workflow — real `ProjectProfile`/`CreativeBrief`/
`VisualIdentity`/`ComponentPlan`/`MotionPlan`/`DesignCritique` artifacts and
an explicit originality score against `references/visual-identity-engine.md`,
rather than being read as reference documentation and defaulting to the same
generic shape anyway. Six matching slash commands live at
`.claude/commands/*.md` for explicit invocation. It's not an app — there's
nothing to deploy or serve here.

The root `package.json`/`tsconfig.json`/`eslint.config.js` exist purely to
type-check and lint the TypeScript under `.claude/skills/motioncanvas/` — run
`npm install` then `npm run typecheck` / `npm run lint` / `npm run format`
before committing changes to any `.ts`/`.tsx` file in this repo. Three more
scripts actually _execute_ code rather than just typecheck it: `npm run
plugins:smoke` (the plugin runtime), `npm run validate:registry` (command-
registry drift check), and `npm run tokens:build` (regenerates the design
token artifacts) — see `CONTRIBUTING.md`.

## Layout

- `.claude/skills/motioncanvas-core/`, `-dashboard/`, `-landing/`,
  `-review/`, `-motion/`, `-design-system/` — the six installable skills,
  each a single `SKILL.md` under 150 lines stating a mandatory gate
  sequence (ProjectProfile → CreativeBrief → VisualIdentity → ComponentPlan
  → MotionPlan → implementation → DesignCritique, scoped per skill) and
  forbidden default patterns. These are what a request should actually
  trigger; they draw on everything below rather than duplicating it.
- `.claude/commands/*.md` — the six matching slash commands (`/motioncanvas`,
  `/dashboard`, `/landing`, `/review-ui`, `/motion`, `/design-system`), each
  under 80 lines, explicitly invoking the matching skill and restating its
  gate sequence and forbidden patterns so they're visible without opening a
  reference doc.
- `.claude/skills/motioncanvas/SKILL.md` — the shared library's entry
  point: component sourcing order and pointers to everything below. Not
  typically triggered directly — see its own frontmatter.
- `.claude/skills/motioncanvas/references/` — design system defaults, motion
  principles, a self-review checklist, and how to draw on external design
  ecosystems (Aceternity, Magic UI, Shadcn, etc.) without live-fetching
  anything.
- `.claude/skills/motioncanvas/snippets/` — real, working React/TypeScript:
  a `MotionProvider` (reduced-motion context + Framer Motion `LazyMotion`),
  `useMagneticButton`, `usePremiumScroll`, a worked example button composing
  them, and `motion/` — a twelve-primitive motion library built on the same
  provider/hooks (see `snippets/motion/README.md`). These are reference
  implementations to copy into a target project and adapt, not a package
  this repo publishes.
- `.claude/skills/motioncanvas/providers/` — a small interface layer
  (`Provider<TQuery, TResult>` plus domain-specific extensions) so new
  inspiration/component/motion/template/asset sources can be added without
  editing `SKILL.md`. Most providers have real implementations, scoped
  honestly (a local-JSON pattern for sources with no public API, a real
  Figma REST API client, real local-file Spline asset resolution) — see
  `providers/README.md` for which is which and why.
- `.claude/skills/motioncanvas/plugins/` — a real, executed in-process
  plugin runtime (registration, dependency resolution, version
  compatibility, config validation, filesystem discovery) wrapping
  providers, plus example plugins and a real smoke test (`npm run
plugins:smoke`) — see `plugins/README.md`.
- `.claude/skills/motioncanvas/commands/` — a metadata catalog of this
  skill's own workflow entry points, with a drift validator (`npm run
validate:registry`) — see `commands/README.md`.
- `.claude/skills/motioncanvas/tokens/` — the design-token compiler: one
  source of truth (`design-tokens.ts`) compiled to CSS/Tailwind/TypeScript/
  JSON via `npm run tokens:build` — see `tokens/README.md`.
- `.claude/skills/motioncanvas/examples/ai-saas-landing/` — one complete,
  worked run of the SKILL.md workflow end to end, meant as the model for how
  much reasoning a real build should show, not just its code.
- `.claude/skills/motioncanvas/analysis/` — the `ProjectProfile`,
  `CreativeBrief`, and `VisualIdentity` types (+ docs) for the
  repo-intelligence, intent, and visual-identity gates — filled in by the
  agent's own reading/judgment, not an automated scanner.
- `.claude/skills/motioncanvas/references/visual-identity-engine.md` — the
  anti-generic rules, originality scoring rubric, visual DNA/concept
  generation, AI cliché detection, and known-generic-pattern list every
  installable skill's VisualIdentity gate is checked against.
- `.claude/skills/motioncanvas/showcase/` — a real before/after screenshot
  pipeline (Playwright + esbuild + Tailwind), fully isolated: its own
  `package.json`/`node_modules`, excluded from the root `tsconfig.json`/
  `eslint.config.js`/CI — never a dependency of the commands above. See
  `showcase/README.md`.

See `references/architecture.md` for a diagram of how these fit together,
and `CONTRIBUTING.md` for the contributor-facing setup/rules.

## Editing this skill family

- Keep every `SKILL.md` short — the shared library's under 150 lines, and
  each of the six installable skills' under 150 lines too; move anything
  long-form into `references/`. Keep every `.claude/commands/*.md` under 80
  lines.
- A `motioncanvas-*` skill states its mandatory gate sequence and forbidden
  patterns directly — it is not a documentation index. Don't let a new
  skill regress into descriptive prose; if it needs long-form explanation,
  that explanation belongs in `references/`, with the skill file just
  naming the gate and pointing there.
- Snippets should stay dependency-light (Framer Motion + optional GSAP
  comment, no extra libraries) and framework-agnostic within
  React/Next.js — don't hard-code a specific target project's tokens/paths.
- Don't add claims of live integration with external sites/APIs (21st.dev,
  Awwwards, Spline, etc.) — the skill explicitly does not fetch anything at
  runtime; see `references/providers.md` and `providers/README.md` for how
  those are meant to be used instead.
- Any new file under `snippets/`, `providers/`, `plugins/`, `commands/`,
  `tokens/`, `analysis/`, or `examples/` must pass `npm run typecheck` and
  `npm run lint` (strict TypeScript, no `any` escape hatches without
  reason) before it's committed. If it's meant to actually run (a plugin, a
  compiler) or is a typed data table an agent consults (an `analysis/*.ts`
  artifact), extend `npm run plugins:smoke` / `tokens:build` /
  `validate:registry` (or add a new script following that pattern) so it's
  genuinely exercised, not just typechecked.
- Don't add a provider implementation that fakes a live integration — an
  interface with no backing implementation is more honest than a stub that
  returns empty arrays and claims to work.
- Don't claim a numeric quality/originality score came from a tool that
  didn't run — `VisualIdentity.originalityScore` is documented agent
  judgment against `references/visual-identity-engine.md`'s rubric, not a
  measured metric; keep that distinction explicit anywhere it's mentioned.
