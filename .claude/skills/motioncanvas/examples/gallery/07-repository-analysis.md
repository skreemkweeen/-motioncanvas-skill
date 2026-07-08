# Walkthrough: repository analysis

## Prompt

> "Before you build anything, can you tell me what you'd find if you looked
> at how this repo currently handles styling and motion?"

An explicit ask for the repo-intelligence step in isolation — no build
request attached yet. This is the one walkthrough that exercises
`analysis/project-profile.ts` on its own rather than as a prelude to a build.

## Expected workflow

Per `analysis/README.md`: this is not an automated scanner — every field of
a `ProjectProfile` is filled in by the agent's own tool calls, mapped one
field at a time to a specific Read/Glob/Grep, not asserted from the repo's
reputation or framework choice alone.

1. Read `package.json` for the framework and its version, and Glob for
   `app/` vs `pages/` to tell App Router from Pages Router.
2. Glob for `tailwind.config.*`; if present, read it for theme extensions.
3. Grep `globals.css` (or equivalent) for `--` custom properties already
   defined — an existing token system to reuse, not duplicate.
4. Glob `components/ui/**` and grep `package.json` for `shadcn`/
   `@radix-ui/*` to identify an existing component library.
5. Read `package.json` for motion libraries already installed
   (`framer-motion`, `gsap`, etc.).
6. Grep the repo for `prefers-reduced-motion`/`useReducedMotion` to check
   existing accessibility handling — a profile shouldn't claim "no reduced-
   motion handling" without actually checking.
7. Read `tsconfig.json` for strict mode and path aliases.
8. Sample a few existing component/hook filenames to read off the real
   naming convention in use, rather than assuming PascalCase/camelCase by
   default.
9. Fill in a `ProjectProfile` object from what was actually found — leaving
   optional fields (like `componentLibrary`) out where genuinely absent
   rather than guessing.
10. Call `summarizeProjectProfile()` to render it into the short readable
    note handed back to the user.

## Generated artifacts

No code — a profile and its rendered summary. A realistic example of what
`summarizeProjectProfile()` would actually produce for a Next.js + Tailwind
project that has Framer Motion installed but no reduced-motion handling yet:

```
Framework: Next.js (App Router) (14.2.0)
Routing: app router
Styling: Tailwind CSS
Tailwind config: tailwind.config.ts
Existing design tokens: --color-primary, --color-surface, --radius-md
Component library: shadcn/ui (components/ui/)
Motion libraries installed: framer-motion
Existing reduced-motion handling: no
TypeScript strict mode: yes
Path aliases: @/*
Naming conventions: components PascalCase.tsx, hooks camelCase useX.ts
```

## Explanation

The concrete, checkable value here is "Existing reduced-motion handling:
no" — a real finding from actually grepping the repo, not a default
assumption. If this project later asks for motion-heavy UI, that line is
exactly what would trigger wiring up `snippets/motion-provider.tsx`'s
`prefers-reduced-motion` handling as part of the build rather than assuming
it already exists (or worse, not thinking about it at all). This is the
whole point of running repository intelligence as its own step rather than
skipping straight to code: the profile surfaces gaps like this before
they become a shipped accessibility regression.
