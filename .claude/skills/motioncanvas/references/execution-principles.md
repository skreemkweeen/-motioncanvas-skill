# Execution principles

These override stylistic preference — apply them to every generation, not
just when explicitly asked. Moved out of `SKILL.md` itself so that file can
stay a short, skimmable entry point (see `SKILL.md`'s own note on this) —
this is the long-form version every `motioncanvas-*` skill's "DesignCritique"
gate points back to.

- **Design review** — before returning an implementation, check it against
  `quality-checklist.md` one more time and ask: does this look intentionally
  designed, or does anything feel repetitive, AI-generated, or distracting
  from the user's goal? Fix obvious issues within scope before handing back,
  rather than noting them and moving on. Cross-check against
  `visual-identity-engine.md`'s cliché list specifically — a checklist pass
  alone won't catch "technically correct but generic."
- **Simplicity first** — a single component doesn't need a provider,
  registry, context, or config file; a full app/design-system buildout might
  justify all four (see `providers.md`/`plugins/README.md`). Match the
  abstraction to the request's actual size — prefer the straightforward
  solution over the clever one.
- **Repository identity** — adapt to the target repo's existing visual
  language, motion density, and conventions (see `analysis/README.md` and
  `analysis/project-profile.ts`); never redesign toward a personally
  preferred style. This skill adapts to the repo, not the other way around.
- **Motion philosophy** — every animation must answer why it's moving and
  what state change it communicates (`motion-principles.md`'s "when not to
  animate"); if removing it would make the interface clearer, remove it.
- **Motion budget** — calibrate intensity to the surface, independent of
  which named preset (`motion-director.md`) is in use:

  | Surface                                      | Intensity   |
  | -------------------------------------------- | ----------- |
  | Landing pages, portfolios                    | Medium–High |
  | Marketing sites                              | Medium      |
  | Dashboards                                   | Low         |
  | Admin panels                                 | Very low    |
  | Data tables, forms, authentication, settings | Minimal     |

  Critical workflows (auth, destructive actions, settings) prioritize
  clarity over spectacle every time.

- **Component evolution** — reuse an existing component, then extend it,
  then compose several, then consider replacing one, and only then build
  something new (`component-composition.md` has the full search → evaluate
  → merge → normalize → register process).
- **Accessibility beyond compliance** — `quality-checklist.md`'s
  Accessibility section is the bar; also weigh RTL, localization, and
  variable content length when the request touches them.
- **Performance philosophy** — measure before optimizing; prefer Server
  Components, streaming, Suspense, lazy loading, and image optimization over
  client-side JavaScript effects with little UX value
  (`quality-checklist.md`'s Performance section).
- **Context budget** — load only the reference docs the current stage needs
  (`prompt-modules.md`) — don't read the whole `references/` directory for a
  single-component ask.
- **Engineering standards** — strict TypeScript, accessible, responsive,
  dependency-light, consistent with the repo's own conventions.
- **Repository preservation** — don't replace an existing pattern (folder
  structure, hooks, utilities, tokens, state management, testing strategy)
  without a clear reason; integrate rather than relocate.

## Creative quality gate

Immediately before returning code, ask: would a senior frontend engineer
approve this implementation, and would a senior product designer be
comfortable shipping this interface? Does it feel intentional rather than
generated? Run `visual-identity-engine.md`'s originality scoring here if a
`motioncanvas-*` skill's gate sequence requires a VisualIdentity — a low
score means revise the concept now, not ship it with a caveat. If a
meaningful improvement is available within the requested scope, make it
first.

## Definition of done

- [ ] Satisfies the request — nothing more, nothing less.
- [ ] Strict TypeScript, no unexplained `any`.
- [ ] Existing project conventions preserved.
- [ ] Motion is purposeful, or deliberately absent.
- [ ] Accessibility actually reviewed, not just typed correctly.
- [ ] Responsive behavior considered.
- [ ] Any new dependency is flagged, not silently added.
- [ ] Documentation updated if the change's size warrants it (see Output
      expectations below).
- [ ] No more complex than the request requires.
- [ ] Not a rejected generic pattern from `visual-identity-engine.md`,
      unless the user explicitly asked for that exact pattern by name.

## Output expectations

Scale deliverables to what was asked:

- One component or section → the component, correctly typed, accessible, and
  motion-appropriate. No unrequested test scaffolding or docs unless the
  project already has that convention.
- A new page/feature → also update routing/imports as needed, and flag
  (don't silently add) any new dependency.
- A full app/design-system buildout → proactively ask whether tests,
  Storybook, or a11y tooling (axe, Playwright) should be included, since
  those are real time/dep costs — don't assume yes.

Don't claim numeric quality scores ("Lighthouse 98", "WCAG 100%") — those
require actually running the tools. If asked to verify, run real
Lighthouse/axe/Playwright and report actual results instead of asserting a
number. The one number this skill family does assert is the VisualIdentity
originality score, because it's a documented rubric applied by the agent's
own judgment, not a claimed tool measurement — see
`visual-identity-engine.md`.
