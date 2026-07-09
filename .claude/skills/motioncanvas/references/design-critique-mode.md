# Design critique mode

A review-only mode for when the ask is to evaluate an _existing_ UI, not
build a new one — "review this component," "what's wrong with this page,"
"audit our design system." No code changes unless the user asks for fixes
after seeing the findings.

## Trigger

An explicit ask to review, critique, audit, evaluate, or grade an existing
implementation, as opposed to a build/change request. If it's ambiguous
whether they want a critique or a fix, ask — don't guess and start editing.

## What to review

Ground every finding in the actual code (and, where this session can
actually run the app, the rendered UI) — not a guess from the component
name. Read the real files before writing findings.

- **Hierarchy** — is the focal point of each screen/section unambiguous.
- **Spacing** — consistent with a scale, or one-off values scattered around.
- **Typography** — scale, line-height, line-length; see `design-system.md`.
- **Responsiveness** — behavior at the breakpoints actually in use, not just
  desktop and one mobile width.
- **Accessibility** — semantic HTML, keyboard operability, contrast, ARIA;
  see `quality-checklist.md`'s Accessibility section.
- **Motion** — does it clarify state/hierarchy or just decorate; is
  `prefers-reduced-motion` respected; see `motion-principles.md`.
- **Interaction quality** — hover/focus/active/disabled/loading states
  actually present and distinguishable.
- **Maintainability** — duplicated patterns that should be one component,
  unjustified `any`, naming inconsistent with the rest of the repo.

This is the same bar as the build workflow (`quality-checklist.md`,
`motion-principles.md`, `design-system.md`) — critique mode applies it to
existing code instead of new code, it isn't a separate standard.

## Output format

A findings list, most severe first:

- **Location** — file/component (and line, if applicable).
- **What's wrong** — concrete, not vague ("the CTA button has no
  `:focus-visible` style," not "accessibility could be better").
- **Why it matters** — the concrete failure scenario ("a keyboard user
  tabbing through the form can't see which field is focused").
- **Suggested fix** — one line; a full diff only if asked.

## What this mode does not do

- Doesn't touch code unless asked to fix what was found.
- Doesn't assert a numeric score ("Accessibility: 72/100") unless a real
  tool (axe, Lighthouse) was actually run — report that tool's real output
  instead of inventing a number.
- Doesn't manufacture findings to look thorough — if a screen is basically
  fine, say so instead of padding the list with nitpicks.

## After the critique

If the user asks for fixes, switch to the normal build workflow
(`SKILL.md`'s Workflow section), treating each accepted finding as a
requirement, and run `review-pipeline.md` on the fix before handing back.
