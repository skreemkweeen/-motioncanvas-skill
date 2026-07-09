# -motioncanvas-skill

A family of Claude Code skills for modern UI/UX, React, Next.js, Tailwind CSS,
Framer Motion, GSAP, Three.js, Spline, Shadcn UI, and premium component
generation — built to enforce a strict, gate-driven workflow (real
`ProjectProfile`/`CreativeBrief`/`VisualIdentity`/`ComponentPlan`/
`MotionPlan`/`DesignCritique` artifacts, an explicit originality score, and a
list of generic patterns to reject by default) instead of being read as
reference documentation and generating the same default shape anyway.

`.claude/skills/motioncanvas/` is the shared reference library (design
system defaults, motion principles, providers, plugins, tokens, worked
examples) — see the Skill catalog below for the six installable skills that
actually enforce the workflow, and Slash commands for the fastest way to
invoke one explicitly. There's nothing to `npm install` into a target
project and no runtime any of this starts — see "Installation" below for
what actually happens.

## Skill catalog

| Skill folder                 | Install name                 | Purpose                                                              | Example prompt                                          | When to use it                                                                  |
| ---------------------------- | ---------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `motioncanvas-core`          | `motioncanvas-core`          | Default gate-driven workflow for any UI build/upgrade                | "Build a settings page for this app"                    | Nothing more specific fits, or the request spans multiple domains               |
| `motioncanvas-dashboard`     | `motioncanvas-dashboard`     | Dense internal tools, admin panels, analytics dashboards             | "Build an analytics dashboard for our API usage"        | Internal tools, admin panels, data-dense UI                                     |
| `motioncanvas-landing`       | `motioncanvas-landing`       | Marketing/landing pages, hero sections, pricing pages                | "Build a landing page for our AI meeting-notes product" | Persuasive marketing/product pages                                              |
| `motioncanvas-review`        | `motioncanvas-review`        | Review-only critique of existing UI, no code changes unless asked    | "Review this component for accessibility and hierarchy" | Evaluating/auditing UI that already exists                                      |
| `motioncanvas-motion`        | `motioncanvas-motion`        | Add/remove/tune motion on UI that already exists                     | "Add micro-interactions to this button"                 | Animation-only requests, no new structure needed                                |
| `motioncanvas-design-system` | `motioncanvas-design-system` | Build/extend a design system, token set, or shared component library | "Build a design system for our product suite"           | The visual system itself, not one page built from it                            |
| `motioncanvas` (this repo's) | `motioncanvas`               | Shared reference library the six skills above draw on                | —                                                       | Not typically invoked directly — see "Reference material" in its own `SKILL.md` |

Each of the six installable skills is short, strict, and gate-driven on
purpose (`SKILL.md` under 150 lines) — see
`.claude/skills/motioncanvas/references/roadmap.md` for why this split
replaced a single descriptive `SKILL.md`.

## Slash commands

Six matching commands under [`.claude/commands/`](.claude/commands/), for
invoking a specific skill explicitly instead of relying on automatic
trigger-matching:

| Command          | Invokes                      |
| ---------------- | ---------------------------- |
| `/motioncanvas`  | `motioncanvas-core`          |
| `/dashboard`     | `motioncanvas-dashboard`     |
| `/landing`       | `motioncanvas-landing`       |
| `/review-ui`     | `motioncanvas-review`        |
| `/motion`        | `motioncanvas-motion`        |
| `/design-system` | `motioncanvas-design-system` |

Example: `/dashboard build an analytics dashboard for our API usage,
including error-rate and latency metrics`. Each command's own file
(`.claude/commands/*.md`) states the mandatory gate sequence and forbidden
default patterns for that domain, so the workflow is visible before
generation starts even if you never open a reference doc.

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

Two ways to make the skills available, depending on whether you're working
in this repo or a separate project:

**Working in this repo directly** — nothing to install. Open a Claude Code
session here and everything is already at `.claude/skills/` and
`.claude/commands/`, discoverable automatically.

**Using it in another project** — copy the shared library plus whichever
installable skills and commands you want:

```bash
# from this repo — the shared library every skill below draws on
cp -r .claude/skills/motioncanvas /path/to/your-project/.claude/skills/motioncanvas

# the installable skills (copy all six, or only the ones you need)
cp -r .claude/skills/motioncanvas-core /path/to/your-project/.claude/skills/motioncanvas-core
cp -r .claude/skills/motioncanvas-dashboard /path/to/your-project/.claude/skills/motioncanvas-dashboard
cp -r .claude/skills/motioncanvas-landing /path/to/your-project/.claude/skills/motioncanvas-landing
cp -r .claude/skills/motioncanvas-review /path/to/your-project/.claude/skills/motioncanvas-review
cp -r .claude/skills/motioncanvas-motion /path/to/your-project/.claude/skills/motioncanvas-motion
cp -r .claude/skills/motioncanvas-design-system /path/to/your-project/.claude/skills/motioncanvas-design-system

# the slash commands, if you want /dashboard, /landing, etc.
cp -r .claude/commands /path/to/your-project/.claude/commands
```

The shared library (`motioncanvas`) is required by all six installable
skills — copy it even if you only want one of them. No build, no
registration command, no config file to edit. Claude Code discovers skills
under `.claude/skills/*/SKILL.md` and commands under `.claude/commands/*.md`
automatically the next time you start a session in that project.

## Quick start

Open a Claude Code session in the project you copied into, and either type
a slash command (`/dashboard build an analytics dashboard for our API
usage`) or just ask for something the matching skill's frontmatter
`description` covers — Claude Code should pick it up automatically. For
example:

> "Build a landing page hero section for a project management SaaS product."

should trigger `motioncanvas-landing` without a slash command. Either way,
the matching skill's mandatory gate sequence runs: read your project's
existing conventions (ProjectProfile) before generating anything, state the
build's intent/visual concept/originality score (CreativeBrief/
VisualIdentity) before layout, plan components before code (ComponentPlan),
plan motion before adding any (MotionPlan), then self-review before
returning (DesignCritique) — see the Skill catalog above for which skill
covers which domain. See `.claude/skills/motioncanvas/examples/gallery/` for
seven narrated workflow walkthroughs, and `examples/ai-saas-landing/` for
one complete worked build.

If a skill doesn't seem to trigger, see Troubleshooting below.

## Layout

See [`CLAUDE.md`](CLAUDE.md) for the full directory-by-directory layout, and
[`references/architecture.md`](.claude/skills/motioncanvas/references/architecture.md)
for a diagram of how the pieces fit together. Short version:

- [`.claude/skills/motioncanvas-core/`](.claude/skills/motioncanvas-core),
  `motioncanvas-dashboard/`, `motioncanvas-landing/`, `motioncanvas-review/`,
  `motioncanvas-motion/`, `motioncanvas-design-system/` — the six
  installable, gate-driven skills (see Skill catalog above), each a single
  `SKILL.md` under 150 lines.
- [`.claude/commands/`](.claude/commands) — the six matching slash commands
  (see Slash commands above).
- [`SKILL.md`](.claude/skills/motioncanvas/SKILL.md) — the shared library's
  entry point; not typically triggered directly.
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
- [`analysis/`](.claude/skills/motioncanvas/analysis) — the `ProjectProfile`,
  `CreativeBrief`, and `VisualIdentity` data shapes for the repo-intelligence,
  intent, and visual-identity gates
- [`showcase/`](.claude/skills/motioncanvas/showcase) — a real, isolated
  before/after screenshot pipeline (never a dependency of this repo's own
  typecheck/lint/CI)
- [`references/roadmap.md`](.claude/skills/motioncanvas/references/roadmap.md) —
  what's built vs. planned
- [`references/api-reference.md`](.claude/skills/motioncanvas/references/api-reference.md) —
  every exported symbol, classified Public/Internal/Interface-only
- [`references/release-audit.md`](.claude/skills/motioncanvas/references/release-audit.md) —
  stability, workflow-validation, and real performance-measurement results

## Troubleshooting

- **A skill doesn't seem to trigger.** Check that both the shared library
  (`.claude/skills/motioncanvas/`) and the specific skill directory (e.g.
  `.claude/skills/motioncanvas-dashboard/`) exist at those paths in the
  project you're working in — a partial copy (missing the frontmatter, or
  copied into the wrong directory) won't be discovered. Try the matching
  slash command (`/dashboard`, `/landing`, etc.) for an explicit invocation
  instead of relying on automatic trigger-matching, or a prompt closer to
  that skill's own frontmatter `description` wording if a very generic
  request isn't picking it up.
- **A slash command doesn't appear.** Check that `.claude/commands/*.md`
  copied over — commands are discovered per-project the same way skills
  are, and a partial copy of just `.claude/skills/` without `.claude/commands/`
  won't have them.
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
