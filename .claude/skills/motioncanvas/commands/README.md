# Command registry

`registry.ts` is a structured metadata catalog of this skill's own workflow
entry points (build / critique / profile) — not a live command dispatcher.
Claude Code skills don't expose custom sub-commands this repo could hook
into at runtime, so there is no code here that actually routes a request to
one of these entries; `SKILL.md` itself still does that by being read and
reasoned about directly.

What this buys you instead: a single, checkable place recording which
providers and reference docs each mode of this skill actually depends on,
plus a real check (`validate.ts`, run via `npm run validate:registry`) that
those references haven't drifted — a renamed or deleted file that a command
entry still points at is a build failure, not a silent doc rot.

**This predates, and is a different thing from, the real slash commands** at
the repo root (`.claude/commands/*.md` — `/motioncanvas`, `/dashboard`,
`/landing`, `/review-ui`, `/motion`, `/design-system`). Those are live
Claude Code commands a user actually types; this file stays a metadata
catalog for the underlying build/critique/profile modes those commands and
the `motioncanvas-*` skills draw on, not a duplicate of them.

## Adding a command entry

1. Add an entry to `SKILL_COMMANDS` in `registry.ts` with a real
   `name`/`aliases`/`category`/`description`/`examples`.
2. List the provider source files and reference docs it actually depends on
   in `requiredProviders`/`requiredPromptModules` — paths relative to the
   skill root (e.g. `"references/motion-principles.md"`).
3. Run `npm run validate:registry` to confirm every path you listed exists.
