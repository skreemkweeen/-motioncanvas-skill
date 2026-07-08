# Contributing

This repo ships one Claude Code Skill (`.claude/skills/motioncanvas/`) — a
reference kit of instructions, docs, and copy-in code, not an app. There's
nothing to build or deploy; the bar for a change is that it typechecks,
lints, and stays honest about what actually works.

## Setup

```
npm install
npm run typecheck   # tsc --noEmit over snippets/, providers/, examples/
npm run lint        # ESLint (typescript-eslint + react-hooks)
npm run format      # prettier --check
```

Run all three before opening a PR. `npm run format:write` applies Prettier's
fixes if `format` fails.

## Where things go

See `CLAUDE.md` for the full layout, or `references/architecture.md` for a
diagram. Short version:

- `SKILL.md` — the entry point; keep it skimmable.
- `references/` — long-form guidance (design system, motion principles,
  review pipeline, extension guide, this list continues in the file itself).
- `snippets/` — real, working React/TypeScript to copy into a target project.
- `providers/` — the interface layer for pluggable sources; most are
  interfaces only, see `providers/README.md` for which have real
  implementations.
- `examples/` — complete, narrated reference builds.
- `analysis/` — the `ProjectProfile` type for the repo-intelligence step.

`references/extending.md` has step-by-step instructions for adding a new
motion primitive, provider, or reference example.

## Rules that apply to every change

- **No fake integrations.** If something can't actually work without a live
  external service that isn't wired up here, it's documented as an
  interface, not shipped as a working implementation. Don't add a provider
  that returns hardcoded/empty data and calls itself real.
- **No unjustified new dependencies.** Snippets stay dependency-light
  (Framer Motion + optional documented GSAP, nothing else) — state the
  reason in the file's own doc comment if you add one.
- **Strict TypeScript, no unexplained `any`.**
- **Document in the same change**, not a follow-up — a new subsystem
  without docs isn't done.
- **No breaking changes to existing exported names/types** without a
  migration note in the PR description; prefer additive (new optional
  fields, new files) over rewriting what's there.

## Commit style

Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), one
logical change per commit — a new subsystem and an unrelated formatting pass
don't belong in the same commit.
