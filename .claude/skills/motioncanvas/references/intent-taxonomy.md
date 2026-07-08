# Intent taxonomy

Before planning a build, classify the request into one of eleven categories
below, then read that category's defaults from
`analysis/intent-taxonomy.ts` — audience, core features, IA, layout
strategy, motion preset, and primitives. This isn't a piece of software
that classifies requests automatically; it's the agent's own judgment,
backed by a concrete lookup table instead of a generic instinct for "what
should a landing page look like."

## The pipeline

For anything beyond a single component or a pure animation/review request,
work through this in order — it's the same shape as the objective this doc
was written to satisfy:

```
Application type (which category below)
  -> Target audience (from the category, adjusted for specifics the user gave)
  -> Core features (the category's list, trimmed/extended for the actual ask)
  -> Information architecture
  -> Layout strategy
  -> Design system (references/design-system.md, tokens/)
  -> Motion style (the category's recommended preset, snippets/motion/presets.ts)
  -> Component plan (references/component-composition.md)
  -> Implementation plan (SKILL.md's Workflow)
```

For a vague request ("build me a fintech dashboard"), this pipeline is
what turns it into something concrete enough to build: fintech dashboard →
`dashboard` category → operator audience, data-dense IA, enterprise motion
preset → then the specifics (which metrics, which actions) come from
clarifying with the user, not from guessing.

## The eleven categories

| Category            | When it applies                                                             |
| ------------------- | --------------------------------------------------------------------------- |
| `landing-page`      | A single marketing/conversion page.                                         |
| `dashboard`         | Data-dense monitoring/action view.                                          |
| `saas-product`      | A composite of marketing + app surfaces — classify each surface separately. |
| `marketplace`       | Two-sided listings/search/transaction platform.                             |
| `admin-panel`       | Internal CRUD tooling for an operator.                                      |
| `portfolio`         | A person/studio's work showcase.                                            |
| `mobile-app`        | Touch-first, single-column, shallow hierarchy.                              |
| `design-system`     | Tokens/components/docs for reuse, not a single UI.                          |
| `component`         | One component — skip this whole pipeline, see its entry.                    |
| `animation-request` | Motion-only change to existing UI — skip this whole pipeline.               |
| `ui-review`         | Evaluate existing UI — switch to `design-critique-mode.md` instead.         |

See `analysis/intent-taxonomy.ts` for each category's full defaults. Three
of the eleven (`component`, `animation-request`, `ui-review`) exist mainly
to say "don't run the full pipeline for this" — check those first since
they're the fastest to rule in or out.

## When a request doesn't fit cleanly

Pick the closest category and note the mismatch explicitly rather than
forcing a fit silently, or ask the user which framing they meant if it's
genuinely ambiguous (e.g., "internal tool" could be `dashboard` or
`admin-panel` depending on whether it's monitoring or CRUD-heavy).
