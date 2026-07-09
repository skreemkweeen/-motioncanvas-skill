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
- **Spacing/whitespace** — consistent with a scale, or one-off values
  scattered around; is negative space used deliberately around the most
  important element, or spread evenly with no emphasis.
- **Typography** — scale, line-height, line-length; see `design-system.md`.
- **Color usage** — semantic tokens vs. raw hex scattered through the code;
  contrast against `quality-checklist.md`'s AA thresholds in both themes if
  the project has dark mode; accent color used sparingly (one primary
  action color per view) rather than everything competing for attention.
- **Responsiveness** — behavior at the breakpoints actually in use, not just
  desktop and one mobile width.
- **Accessibility** — semantic HTML, keyboard operability, contrast, ARIA;
  see `quality-checklist.md`'s Accessibility section.
- **Motion/animation quality** — does it clarify state/hierarchy or just
  decorate; is `prefers-reduced-motion` respected; are durations/easing
  consistent with one preset (`motion-director.md`) or scattered ad hoc; see
  `motion-principles.md`.
- **Interaction quality** — hover/focus/active/disabled/loading states
  actually present and distinguishable.
- **Performance** — `quality-checklist.md`'s Performance section: motion
  animating transform/opacity only, heavy dependencies code-split, no
  obvious layout-shift sources. Only report a number (bundle size, LCP) if
  a real tool was actually run to get it.
- **Maintainability** — duplicated patterns that should be one component,
  unjustified `any`, naming inconsistent with the rest of the repo.

This is the same bar as the build workflow (`quality-checklist.md`,
`motion-principles.md`, `design-system.md`) — critique mode applies it to
existing code instead of new code, it isn't a separate standard.

## Output format

A findings list, grouped by priority, most severe group first:

- **Blocking** — breaks the UI for some real set of users (keyboard traps,
  missed contrast on body text, layout that doesn't work at a breakpoint
  actually in use).
- **High** — a real but non-blocking problem (inconsistent motion timing,
  a missing loading state, a semantic-HTML gap ARIA is papering over).
- **Medium** — a polish gap a careful team would fix before shipping but
  that doesn't break anything (spacing drift, an unclear focal point).
- **Low** — a nitpick worth naming but not worth blocking on.

Within each group, every finding gets:

- **Location** — file/component (and line, if applicable).
- **What's wrong** — concrete, not vague ("the CTA button has no
  `:focus-visible` style," not "accessibility could be better").
- **Why it matters** — the concrete failure scenario ("a keyboard user
  tabbing through the form can't see which field is focused").
- **Suggested fix** — one line; a full diff only if asked.

Skip empty priority groups rather than listing "None" — most reviews won't
have a Blocking section, and that's a fine outcome to report as-is.

## What this mode does not do

- Doesn't touch code unless asked to fix what was found.
- Doesn't assert a numeric score ("Accessibility: 72/100") unless a real
  tool (axe, Lighthouse) was actually run — report that tool's real output
  instead of inventing a number.
- Doesn't manufacture findings to look thorough — if a screen is basically
  fine, say so instead of padding the list with nitpicks.

## After the critique

If the user asks for fixes, switch to the normal build gate sequence (the
`motioncanvas-*` skill matching the surface being fixed — e.g.
`motioncanvas-dashboard` for a dashboard), treating each accepted finding as
a requirement, and run `review-pipeline.md` on the fix before handing back.
