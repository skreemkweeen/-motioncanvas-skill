# Visual identity

Before any layout or component code exists, fill in a `VisualIdentity`
(`visual-identity.ts`) — the creative-decision counterpart to
`creative-brief.ts`'s functional-intent artifact. Full rubric, cliché list,
and originality scoring in `references/visual-identity-engine.md`; this file
is just where each field comes from.

## Where each field comes from

| Field                     | Source                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `concept`                 | One sentence, generated before visual DNA — see visual-identity-engine.md's "Concept generation".                               |
| `differentiator`          | What keeps this build from being interchangeable with a competitor's version — named explicitly, not implied.                   |
| `colorDirection`          | The role each color plays, informed by `analysis/project-profile.ts` (existing tokens) and `creative-brief.ts` (`visualStyle`). |
| `typographicVoice`        | The pairing and why it fits this audience — see visual-identity-engine.md's Visual DNA table.                                   |
| `layoutMetaphor`          | A concrete reference point, checked against the Known generic patterns list before finalizing.                                  |
| `motionPersonality`       | Decided before picking a named preset from `references/motion-director.md`, not after.                                          |
| `signatureElement`        | The one specific move that makes this build memorable — must actually land in the implementation, not just the plan.            |
| `rejectedGenericPatterns` | Filled from `KNOWN_GENERIC_PATTERNS` (`visual-identity.ts`) — which ones were considered and explicitly avoided, and why.       |
| `originalityScore`        | 0–10 against visual-identity-engine.md's rubric — agent judgment, never a claimed tool output.                                  |
| `originalityRationale`    | One line justifying the score.                                                                                                  |

## Using the identity

1. Generate the concept first, then the visual DNA fields, then score it —
   not the reverse (see visual-identity-engine.md's "Concept generation").
2. A score below 7 means revise the concept and DNA before writing layout or
   component code — don't proceed and report a low score as a caveat.
3. `summarizeVisualIdentity()` is for when the plan is worth stating to the
   user explicitly before layout starts (any build beyond a single
   component) — same proportionality rule as `project-profile.ts` and
   `creative-brief.ts`.

Skip this gate only where visual identity genuinely doesn't apply: a
review-only request (`design-critique-mode.md`), a pure bugfix, or a request
that explicitly names a standard pattern to use as-is.
