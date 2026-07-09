# Example gallery

Narrated walkthroughs of this skill's workflow against different request
shapes. Each is **Prompt → Expected workflow → Generated artifacts →
Explanation** — a demonstration of the reasoning and reference material the
workflow actually invokes, not a second full codebase.

That's a deliberate scope choice, not a shortcut: `examples/ai-saas-landing/`
and `examples/analytics-dashboard/` are this skill's two complete,
fully-coded reference builds (see each one's own README "Showcase
checklist", and `showcase/` for real before/after screenshots of both).
Six more full builds for the remaining walkthroughs below would be six more
codebases to keep in sync with every future change to `snippets/motion/`,
the token compiler, or the review pipeline, for marginal benefit over good
walkthroughs that point at the same real material — a full build only
graduates out of this gallery when there's a concrete reason (per
`references/roadmap.md`'s output-quality phase) to prove it with real
screenshots, as `02-dashboard.md` did. If a walkthrough below says a
primitive, preset, or provider is used, that primitive/preset/provider is
real and typechecked elsewhere in this repo — nothing here is invented for
the example's sake.

## The seven

1. [`01-landing-page.md`](01-landing-page.md) — new marketing page
2. [`02-dashboard.md`](02-dashboard.md) — data-dense internal app screen;
   graduated to a full reference build, see `examples/analytics-dashboard/`
   and `showcase/dashboard/`
3. [`03-component-modernization.md`](03-component-modernization.md) —
   upgrading an existing component rather than building new
4. [`04-design-critique.md`](04-design-critique.md) — evaluating existing UI,
   no code changes
5. [`05-motion-enhancement.md`](05-motion-enhancement.md) — animation-only
   request on already-built UI
6. [`06-design-system-generation.md`](06-design-system-generation.md) —
   producing a token set + component library, not a single page
7. [`07-repository-analysis.md`](07-repository-analysis.md) — the repo-
   intelligence step in isolation, before any UI work happens

Each maps to one of `analysis/intent-taxonomy.ts`'s eleven request
categories — see `references/intent-taxonomy.md` for the full list,
including the four (marketplace, admin-panel, portfolio, mobile-app) not
given their own walkthrough here because they'd repeat the same workflow
shape as landing-page/dashboard/component with different taxonomy defaults,
not a new pattern worth a separate narrated example.
