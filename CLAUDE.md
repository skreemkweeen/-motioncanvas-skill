# -motioncanvas-skill

This repo holds a single Claude Code Skill: **motioncanvas**, at
`.claude/skills/motioncanvas/`. It's not an app — there's nothing to deploy or
serve here. It's a packaged skill (instructions + reference docs + reusable
motion snippets + a small provider abstraction + one worked reference example)
that other Claude Code sessions load when working on React/Next.js UI, to push
toward more deliberate, motion-appropriate, accessible output instead of
generic default UI.

The root `package.json`/`tsconfig.json`/`eslint.config.js` exist purely to
type-check and lint the TypeScript under `.claude/skills/motioncanvas/` — run
`npm install` then `npm run typecheck` / `npm run lint` / `npm run format`
before committing changes to any `.ts`/`.tsx` file in this repo.

## Layout

- `.claude/skills/motioncanvas/SKILL.md` — the skill definition: when it
  triggers, the workflow it follows, and pointers to the rest.
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
  editing `SKILL.md`. Two providers have real local implementations
  (`ComponentRegistryProvider`, `MotionLibraryProvider`); the rest are
  interfaces only — see `providers/README.md` for which is which and why.
- `.claude/skills/motioncanvas/examples/ai-saas-landing/` — one complete,
  worked run of the SKILL.md workflow end to end, meant as the model for how
  much reasoning a real build should show, not just its code.

## Editing this skill

- Keep `SKILL.md` the entry point — it should stay skimmable; move anything
  long-form into `references/`.
- Snippets should stay dependency-light (Framer Motion + optional GSAP
  comment, no extra libraries) and framework-agnostic within
  React/Next.js — don't hard-code a specific target project's tokens/paths.
- Don't add claims of live integration with external sites/APIs (21st.dev,
  Awwwards, Spline, etc.) — the skill explicitly does not fetch anything at
  runtime; see `references/providers.md` and `providers/README.md` for how
  those are meant to be used instead.
- Any new file under `snippets/`, `providers/`, or `examples/` must pass
  `npm run typecheck` and `npm run lint` (strict TypeScript, no `any`
  escape hatches without reason) before it's committed.
- Don't add a provider implementation that fakes a live integration — an
  interface with no backing implementation is more honest than a stub that
  returns empty arrays and claims to work.
