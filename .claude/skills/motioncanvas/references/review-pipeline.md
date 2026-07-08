# Internal review pipeline

Seven named lenses, run in sequence, for the self-review stage of the
workflow in `SKILL.md`. Read this framing note first: **this is one model
reasoning through seven named perspectives, not seven separate agents.**
Naming the lenses keeps a review comprehensive and gives it a consistent,
reportable shape — it doesn't mean seven independent processes actually run.
Don't describe this pipeline to a user as a multi-agent system; describe
what it actually is.

The lenses restate nothing from `references/quality-checklist.md` or
`references/motion-principles.md` — they point at the relevant section of
each instead, so the criteria live in one place.

## When to run it as a written pass

Scale to the size of the change, same as the rest of this skill. A full
page, feature, or design-system build gets a written pass through every
lens before handing back. A single small component can fold the same
questions into a quick mental check without writing out seven headed
sections — see the compact example below either way.

## The seven lenses

| Lens                      | Checks                                                                                                           | Detailed criteria                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Creative Director**     | Visual hierarchy, focal point clarity, restraint vs. spectacle                                                   | `references/design-system.md`; motion-principles' "when not to animate" |
| **UX Architect**          | Flow and state coverage (empty/loading/error/success), information architecture, discoverability                 | `references/quality-checklist.md` (Visual hierarchy & design)           |
| **Motion Director**       | Duration/easing defaults, reduced-motion handling, motion hierarchy                                              | `references/motion-principles.md`                                       |
| **React Architect**       | Composition and reuse of existing repo/library code, correct client/server boundaries, no unnecessary re-renders | `references/quality-checklist.md` (Code quality)                        |
| **Accessibility Auditor** | Semantic HTML, keyboard operability, contrast, ARIA                                                              | `references/quality-checklist.md` (Accessibility)                       |
| **Performance Engineer**  | transform/opacity-only motion, code-splitting for heavy dependencies, layout shift                               | `references/quality-checklist.md` (Performance)                         |
| **Code Reviewer**         | Typed props, no unjustified `any`, matches the target repo's conventions                                         | `references/quality-checklist.md` (Code quality)                        |

## Output shape

For each lens run as a written pass:

- Lens name.
- Verdict: **pass** or **flag**.
- If flagged: the specific issue and the fix applied (or, if deferred, why).

Don't assert a numeric score per lens ("Accessibility: 98/100") — that
requires a real tool (axe, Lighthouse) that wasn't run. A verdict plus one
sentence of reasoning is honest; a fabricated number isn't. If a real audit
tool was actually run, report its actual output instead of this format.

## Example (compact form, for a mid-size component)

```
Creative Director:      pass  — one clear CTA, restrained motion.
UX Architect:           pass  — loading/error states present.
Motion Director:        flag  — CursorGlow was on a dense list; removed
                                per motion-principles' "when not to animate".
React Architect:        pass  — composed from the existing Card primitive.
Accessibility Auditor:  pass  — keyboard-operable, contrast checked against tokens.
Performance Engineer:   pass  — no new deps, motion is transform/opacity only.
Code Reviewer:          pass  — typed, no `any`, matches file-naming convention.
```
