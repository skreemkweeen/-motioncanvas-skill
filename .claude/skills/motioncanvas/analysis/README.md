# Repository intelligence

Before generating anything beyond a single small component, read the target
repo and fill in a `ProjectProfile` (`project-profile.ts`) — then generate
code against what's actually there instead of assumptions. This is not an
automated scanner: there's no script in this directory that walks a
filesystem and produces a profile on its own. The agent gathers each field
with its own tools, the same way it would investigate any other question
about a codebase.

## Which tool call answers which field

| Field                                     | How to find it                                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `framework.name`/`version`/`routingStyle` | Read `package.json` dependencies; Glob for `app/` vs `pages/` vs `src/routes/` to tell App Router / Pages Router / Remix / React Router apart. |
| `styling.system`/`tailwindConfigPath`     | Glob for `tailwind.config.*`; if absent, check `package.json` for `styled-components`/`@emotion/*`/CSS Modules usage.                          |
| `styling.designTokensFound`               | Grep `globals.css`/`app.css`/the Tailwind config for `--` custom properties or a `theme.extend` block.                                         |
| `componentLibrary`                        | Glob `components/ui/**`; Grep for `shadcn`/`@radix-ui/*` in `package.json`.                                                                    |
| `motion.librariesInstalled`               | Read `package.json` — `framer-motion`, `motion`, `gsap`, `@react-three/fiber`, `lenis`, etc.                                                   |
| `motion.existingReducedMotionHandling`    | Grep for `prefers-reduced-motion` or `useReducedMotion` across the repo.                                                                       |
| `typescript.strict`/`pathAliases`         | Read `tsconfig.json` — `compilerOptions.strict`, `compilerOptions.paths`.                                                                      |
| `namingConventions`                       | Glob a sample of existing component/hook files and read the pattern off their names — don't guess a convention the repo doesn't use.           |

## Using the profile

1. Fill in a `ProjectProfile` object from what you actually found (leave
   optional fields out rather than guessing).
2. Optionally call `summarizeProjectProfile()` to turn it into a short
   readable note before starting the build — useful when the plan is
   non-obvious enough to be worth stating explicitly (a new design system, a
   full page, anything touching more than one existing convention).
3. Every generation decision downstream (which component library to compose
   from, which motion library to use, what naming to follow) should trace
   back to a field in this profile, not a default assumed independent of the
   target repo.

For a single, obviously-scoped component (e.g. "add a loading spinner"),
skip the formal profile — reading the one relevant file or two is enough.
This step is proportional to the size of the ask, same as the rest of the
workflow.
