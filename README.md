# -motioncanvas-skill

Claude Code skill for modern UI/UX, React, Next.js, Tailwind CSS, Framer Motion, GSAP, Three.js, Spline, Shadcn UI, and premium component generation.

The skill itself lives at [`.claude/skills/motioncanvas/`](.claude/skills/motioncanvas/SKILL.md).
Copy that directory into a project's `.claude/skills/` to make it available there, or
use it directly in a Claude Code session opened on this repo.

See [`CLAUDE.md`](CLAUDE.md) for the full directory-by-directory layout, and
[`references/architecture.md`](.claude/skills/motioncanvas/references/architecture.md)
for a diagram of how the pieces fit together. Short version:

- [`SKILL.md`](.claude/skills/motioncanvas/SKILL.md) — trigger conditions and workflow
- [`references/`](.claude/skills/motioncanvas/references) — long-form guidance:
  design system, motion principles, self-review checklist, review pipeline,
  design critique mode, repo intelligence, and more
- [`snippets/`](.claude/skills/motioncanvas/snippets) — `MotionProvider`,
  `useMagneticButton`, `usePremiumScroll`, and
  [`snippets/motion/`](.claude/skills/motioncanvas/snippets/motion) — a
  twelve-primitive motion library, all copy-in reference code
- [`providers/`](.claude/skills/motioncanvas/providers) — the interface layer
  for pluggable design-inspiration/component/motion/template/asset sources;
  see `providers/README.md` for exactly what each can and can't do
- [`plugins/`](.claude/skills/motioncanvas/plugins) — the real, executed
  in-process plugin runtime wrapping those providers, with a real smoke test
  (`npm run plugins:smoke`)
- [`commands/`](.claude/skills/motioncanvas/commands) — a metadata catalog
  of this skill's workflow entry points, with a drift validator (`npm run
validate:registry`)
- [`tokens/`](.claude/skills/motioncanvas/tokens) — the design-token
  compiler: one source of truth compiled to CSS/Tailwind/TypeScript/JSON
  (`npm run tokens:build`)
- [`examples/`](.claude/skills/motioncanvas/examples) — complete, worked
  reference builds
- [`analysis/`](.claude/skills/motioncanvas/analysis) — the `ProjectProfile`
  and `CreativeBrief` data shapes for the repo-intelligence and intent stages
- [`references/roadmap.md`](.claude/skills/motioncanvas/references/roadmap.md) —
  what's built vs. planned

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) — short version: `npm install`, then
`npm run typecheck` / `npm run lint` / `npm run format` before committing.
