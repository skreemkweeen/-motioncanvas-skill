# -motioncanvas-skill

Claude Code skill for modern UI/UX, React, Next.js, Tailwind CSS, Framer Motion, GSAP, Three.js, Spline, Shadcn UI, and premium component generation.

The skill itself lives at [`.claude/skills/motioncanvas/`](.claude/skills/motioncanvas/SKILL.md) —
a `SKILL.md` entry point plus reference docs, copy-in motion snippets, and a
provider/plugin layer that [Claude Code](https://docs.claude.com/en/docs/claude-code)
loads when it's relevant to what you're building. There's nothing to `npm
install` into a target project and no runtime this skill starts — see
"Installation" below for what actually happens.

## Prerequisites

- [Claude Code](https://docs.claude.com/en/docs/claude-code) — the skill only
  does anything inside a Claude Code session; there's no standalone way to
  invoke it.
- A React project, ideally Next.js — the workflow and snippets assume React
  (hooks, Server/Client Components where Next.js is in use); they are not
  written for Vue/Svelte/Angular.
- Framer Motion, if you plan to use the motion snippets as-is — `snippets/`
  imports it directly. Not required just to use the workflow/review-only
  parts of the skill (design critique mode, repo intelligence) against a
  project that has no motion library at all.
- Node.js 18+ and `npm`, but **only if you're contributing to this skill
  itself** (running its own `typecheck`/`lint`/`plugins:smoke`/etc.) — a
  target project consuming the skill needs none of this repo's own tooling.

## Installation

Two ways to make the skill available, depending on whether you're working in
this repo or a separate project:

**Working in this repo directly** — nothing to install. Open a Claude Code
session here and the skill is already at `.claude/skills/motioncanvas/`,
discoverable by its `SKILL.md` frontmatter.

**Using it in another project** — copy the whole skill directory in:

```bash
# from this repo
cp -r .claude/skills/motioncanvas /path/to/your-project/.claude/skills/motioncanvas
```

That's the entire installation step — copy the directory, no build, no
registration command, no config file to edit. Claude Code discovers skills
under `.claude/skills/*/SKILL.md` automatically the next time you start a
session in that project.

## Quick start

Open a Claude Code session in the project you copied (or this repo's own)
`.claude/skills/motioncanvas/` into, and ask for something the skill's
frontmatter `description` covers — building or upgrading UI, motion/polish
requests, dashboards, landing pages, component libraries, design systems.
For example:

> "Build a landing page hero section for a project management SaaS product."

Claude Code should pick up the skill automatically (no slash command, no
explicit invocation) and follow `SKILL.md`'s workflow: classify the request
against `references/intent-taxonomy.md`, read your project's existing
conventions before generating anything, then build using the copied
`snippets/motion/` primitives and your project's own tokens. See
`.claude/skills/motioncanvas/examples/gallery/` for seven narrated
walkthroughs of what this looks like across different request types, and
`examples/ai-saas-landing/` for one complete worked build.

If the skill doesn't seem to trigger, see Troubleshooting below.

## Layout

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
  reference builds, plus a 7-walkthrough gallery
- [`analysis/`](.claude/skills/motioncanvas/analysis) — the `ProjectProfile`
  and `CreativeBrief` data shapes for the repo-intelligence and intent stages
- [`references/roadmap.md`](.claude/skills/motioncanvas/references/roadmap.md) —
  what's built vs. planned
- [`references/api-reference.md`](.claude/skills/motioncanvas/references/api-reference.md) —
  every exported symbol, classified Public/Internal/Interface-only
- [`references/release-audit.md`](.claude/skills/motioncanvas/references/release-audit.md) —
  stability, workflow-validation, and real performance-measurement results

## Troubleshooting

- **The skill doesn't seem to trigger.** Check that
  `.claude/skills/motioncanvas/SKILL.md` actually exists at that path in the
  project you're working in (a partial copy — missing the frontmatter, or
  copied into the wrong directory — won't be discovered). Also try a prompt
  closer to `SKILL.md`'s own frontmatter `description` wording ("build a
  landing page", "add animation", "dashboard UI") if a very generic request
  isn't picking it up.
- **Motion snippets fail to import `framer-motion`.** It's a peer
  expectation, not bundled with the skill — `npm install framer-motion` in
  the target project. See each snippet's own doc comment for exactly what it
  depends on.
- **TypeScript errors after copying snippets in.** The snippets assume
  strict TypeScript (see `tsconfig.json` in this repo for the exact flags
  they're written against). If your project isn't in strict mode, either
  enable it or expect to adjust a few types — this skill won't silently
  loosen its own types to accommodate a non-strict target project.
- **A provider/plugin doesn't do what its name suggests.** Read
  `providers/README.md`'s status table and `plugins/README.md`'s "What's
  real vs. not" section before assuming a capability — several providers are
  deliberately interface-only or scoped to a local-data pattern rather than a
  live integration; see `references/roadmap.md` for what's genuinely planned
  versus not.
- **Contributing and something doesn't typecheck/lint.** See
  [`CONTRIBUTING.md`](CONTRIBUTING.md) for the exact commands and what each
  one covers.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) — short version: `npm install`, then
`npm run typecheck` / `npm run lint` / `npm run format` before committing.
