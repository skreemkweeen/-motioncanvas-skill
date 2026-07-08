# -motioncanvas-skill

Claude Code skill for modern UI/UX, React, Next.js, Tailwind CSS, Framer Motion, GSAP, Three.js, Spline, Shadcn UI, and premium component generation.

The skill itself lives at [`.claude/skills/motioncanvas/`](.claude/skills/motioncanvas/SKILL.md).
Copy that directory into a project's `.claude/skills/` to make it available there, or
use it directly in a Claude Code session opened on this repo.

- [`SKILL.md`](.claude/skills/motioncanvas/SKILL.md) — trigger conditions and workflow
- [`references/`](.claude/skills/motioncanvas/references) — design system, motion
  principles, self-review checklist, external design-ecosystem usage
- [`snippets/`](.claude/skills/motioncanvas/snippets) — `MotionProvider`,
  `useMagneticButton`, `usePremiumScroll`, a worked example component, and
  [`snippets/motion/`](.claude/skills/motioncanvas/snippets/motion) — a
  twelve-primitive motion library (`Fade`, `Slide`, `Reveal`,
  `StaggerContainer`, `HeroReveal`, `SpotlightFollow`, `AnimatedBorder`,
  `FloatingCard`, `CursorGlow`, `AuroraBackground`, and more)
- [`providers/`](.claude/skills/motioncanvas/providers) — a small interface
  layer for pluggable design-inspiration/component/motion/template/asset
  sources; most have real implementations scoped honestly (a local-JSON
  pattern, a real Figma REST client, real local Spline asset resolution),
  see `providers/README.md` for exactly what each can and can't do
- [`plugins/`](.claude/skills/motioncanvas/plugins) — a real, executed
  in-process plugin runtime wrapping those providers (registration,
  dependency resolution, version checks, discovery), with a real smoke test
  (`npm run plugins:smoke`)
- [`commands/`](.claude/skills/motioncanvas/commands) — a metadata catalog
  of this skill's workflow entry points, with a drift validator (`npm run
validate:registry`)
- [`tokens/`](.claude/skills/motioncanvas/tokens) — the design-token
  compiler: one source of truth compiled to CSS/Tailwind/TypeScript/JSON
  (`npm run tokens:build`)
- [`examples/ai-saas-landing/`](.claude/skills/motioncanvas/examples/ai-saas-landing) —
  one complete reference build walked through the full skill workflow
- [`analysis/`](.claude/skills/motioncanvas/analysis) — the `ProjectProfile`
  type for the repo-intelligence workflow stage
- [`references/architecture.md`](.claude/skills/motioncanvas/references/architecture.md) —
  a diagram of how all of the above fit together
- [`references/roadmap.md`](.claude/skills/motioncanvas/references/roadmap.md) —
  what's built vs. planned

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) — short version: `npm install`, then
`npm run typecheck` / `npm run lint` / `npm run format` before committing.
