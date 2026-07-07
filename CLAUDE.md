# -motioncanvas-skill

This repo holds a single Claude Code Skill: **motioncanvas**, at
`.claude/skills/motioncanvas/`. It's not an app — there's nothing to run or
build here. It's a packaged skill (instructions + reference docs + reusable
motion snippets) that other Claude Code sessions load when working on React/
Next.js UI, to push toward more deliberate, motion-appropriate, accessible
output instead of generic default UI.

## Layout

- `.claude/skills/motioncanvas/SKILL.md` — the skill definition: when it
  triggers, the workflow it follows, and pointers to the rest.
- `.claude/skills/motioncanvas/references/` — design system defaults, motion
  principles, a self-review checklist, and how to draw on external design
  ecosystems (Aceternity, Magic UI, Shadcn, etc.) without live-fetching
  anything.
- `.claude/skills/motioncanvas/snippets/` — real, working React/TypeScript:
  a `MotionProvider` (reduced-motion context + Framer Motion `LazyMotion`),
  `useMagneticButton`, `usePremiumScroll`, and a worked example button
  composing them. These are reference implementations to copy into a target
  project and adapt, not a package this repo publishes.

## Editing this skill

- Keep `SKILL.md` the entry point — it should stay skimmable; move anything
  long-form into `references/`.
- Snippets should stay dependency-light (Framer Motion + optional GSAP
  comment, no extra libraries) and framework-agnostic within
  React/Next.js — don't hard-code a specific target project's tokens/paths.
- Don't add claims of live integration with external sites/APIs (21st.dev,
  Awwwards, Spline, etc.) — the skill explicitly does not fetch anything at
  runtime; see `references/providers.md` for how those are meant to be used
  instead.
