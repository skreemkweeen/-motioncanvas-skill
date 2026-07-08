# Prompt modules

There is deliberately no `PromptModuleRegistry` class, no runtime that
"composes" prompt fragments, and no code anywhere in this repo that executes
as part of Claude Code's actual skill-loading process. Building one would be
theater: nothing would ever call it. Here's what actually happens, and why
it already gets you the thing "compose only what's needed" is after.

## How this already works

`SKILL.md` is read once, when the skill triggers. Everything under
`references/`, `analysis/`, and `providers/*.md` is read **lazily, by the
agent's own file-reading tool, only when the workflow stage in `SKILL.md`
actually calls for it.** A request that never needs the motion stage never
causes `motion-principles.md` to be read. A request that isn't a design
critique never causes `design-critique-mode.md` to be read. This is real,
working "compose only the modules required for the current task" — it's
just implemented as short files plus explicit pointers, not a runtime.

Keeping `SKILL.md` itself short (its own rule: "keep it skimmable, move
long-form into `references/`") is what makes this work. Every time someone
is tempted to inline a paragraph of reasoning into `SKILL.md` instead of
linking to a reference file, that's context loaded on every single
invocation of this skill instead of only the requests that need it —
exactly the cost this section is about avoiding.

## The modules

Each reference file below is a "module": self-contained, loaded only when
its stage/situation is relevant, sized to be worth its own file rather than
a paragraph inline in `SKILL.md`.

| Module                               | Loaded when                                 | Roughly   |
| ------------------------------------ | ------------------------------------------- | --------- |
| `analysis/README.md`                 | Repo-intelligence stage, non-trivial builds | ~40 lines |
| `references/design-system.md`        | Design-system stage                         | ~70 lines |
| `references/motion-principles.md`    | Motion stage                                | ~95 lines |
| `references/quality-checklist.md`    | Self-review stage                           | ~65 lines |
| `references/review-pipeline.md`      | Self-review stage (the 7-lens structure)    | ~60 lines |
| `references/design-critique-mode.md` | Review-only requests                        | ~60 lines |
| `references/providers.md`            | Sourcing inspiration/patterns               | ~55 lines |
| `references/architecture.md`         | Understanding how the skill fits together   | ~70 lines |
| `references/extending.md`            | Adding a new primitive/provider/example     | ~50 lines |
| `providers/README.md`                | Adding or understanding a provider          | ~50 lines |
| `plugins/README.md`                  | Adding or understanding a plugin            | ~50 lines |
| `snippets/motion/README.md`          | Choosing a motion primitive                 | ~90 lines |

## If this ever changes

If a future version of Claude Code skills gains an actual mechanism for
declaring "this file only loads under condition X" beyond "the agent reads
it when a workflow step tells it to," revisit this — but don't build a
simulated version of that mechanism in plain TypeScript today just to match
the shape of a request. Keep the real one (short files, explicit pointers,
nothing preloaded) until there's a real one to switch to.
