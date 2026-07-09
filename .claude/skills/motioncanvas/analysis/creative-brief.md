# Creative brief

Before generating anything beyond a single component, fill in a
`CreativeBrief` (`creative-brief.ts`) and use it to guide implementation —
the design-intent counterpart to `project-profile.ts`'s repo-reading
artifact. Same proportionality rule as the project profile: a single
component or a pure animation/review request skips this entirely (see
`references/intent-taxonomy.md`'s `component`/`animation-request`/
`ui-review` entries).

## Where each field comes from

| Field                         | Source                                                                                                                                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `goals`                       | What the user actually asked for, ranked — not a restatement of every feature, the one or two things that matter most.                                                                                                     |
| `constraints`                 | Real ones only: a stated deadline, a required library, an existing convention from `analysis/project-profile.ts` to match. Don't invent constraints.                                                                       |
| `audience`                    | `references/intent-taxonomy.md`'s category default, adjusted for anything the user said about their actual users.                                                                                                          |
| `visualStyle`                 | One sentence, concrete enough to check work against later — "confident and restrained, one accent moment in the hero" (see `examples/ai-saas-landing/README.md`'s design rationale for the level of specificity).          |
| `interactionModel`            | How the user moves through this UI — a linear scroll, a search-first browse, a CRUD table, a single-screen tool.                                                                                                           |
| `accessibilityConsiderations` | Anything beyond the standard `quality-checklist.md` bar this specific build needs — e.g. "this is a healthcare form, validation errors must be unambiguous for screen readers," not a restatement of the checklist itself. |
| `performanceTargets`          | Only list one if it's concrete and checkable ("no new client bundle over 50kb") — don't pad this with vague aspirations.                                                                                                   |
| `animationStrategy`           | Pull from `references/intent-taxonomy.md`'s `recommendedMotionPreset` for the classified category, then `references/motion-director.md` for which primitives implement it.                                                 |

## Using the brief

Write it down (a few lines, not a document) before starting the build, and
check the finished work against it during the review-pipeline pass — did
the actual implementation still serve the stated goals and audience, or did
it drift. `summarizeCreativeBrief()` is there for when it's worth stating
explicitly to the user before starting (a non-obvious plan, a new product
surface) rather than every time.
