# Walkthrough: landing page

## Prompt

> "Build a landing page for our new API observability product. It's aimed at
> backend engineers, not executives — think Datadog/Sentry, not a consumer
> app."

## Expected workflow

1. **Intent + requirements** — matches `references/intent-taxonomy.md`'s
   `landing-page` category. Audience note ("backend engineers, not
   executives") overrides that category's default `stripe` motion preset
   toward something more restrained — the taxonomy entry's own note says to
   override by actual audience, enterprise/technical skewing toward
   `enterprise` or `minimal` rather than the default. A creative brief
   (`analysis/creative-brief.ts`) gets filled in: goals (trial signups),
   audience (skeptical technical evaluators), visual style ("credible,
   information-dense, no marketing gloss"), animation strategy
   ("enterprise preset, one restrained hero moment").
2. **Research** — read the target repo's existing Tailwind config, any
   installed component library, and whether `framer-motion` is already a
   dependency, per `analysis/README.md`.
3. **Planning + layout** — hero → problem/solution → a real
   architecture/screenshot section (engineers want to see the product, not
   read adjectives about it) → CTA. Matches `references/intent-taxonomy.md`'s
   landing-page information architecture.
4. **Design system** — reuse the target repo's existing tokens; `enterprise`
   preset's conservative type scale over anything with a large 4xl+ hero
   moment.
5. **Components** — Shadcn/Radix primitives first per the Component sourcing
   order in `SKILL.md`; a code-snippet/terminal-output visual for the hero
   (a real pattern for this audience) built from scratch since it's specific
   to this product, not an existing pattern to source.
6. **Motion** — `references/motion-director.md`'s guidance for hero
   sequences and page load, applied restrained per the `enterprise` preset
   (see `snippets/motion/presets.ts`).
7. **Accessibility + performance + review** — the seven-lens review pipeline
   (`references/review-pipeline.md`), same bar as any other build.
8. **Code + documentation** — proportional to the ask: the page and its
   sections, no unrequested test scaffolding.

## Generated artifacts

- `hero.tsx`, `problem-solution.tsx`, `product-preview.tsx`, `cta.tsx`,
  composed in a `page.tsx`, following the same Server/Client Component
  boundary discipline as `examples/ai-saas-landing/` (§7 of its README).
- Motion: `HeroReveal` for the hero copy, `Reveal` for section headings, no
  `AuroraBackground`/`CursorGlow`/`FloatingCard` — the `enterprise` preset's
  own interaction notes say to avoid ambient motion entirely for this kind
  of audience.
- A short design-rationale note (not a full README) if the change is
  page-sized, per `SKILL.md`'s Output expectations.

## Explanation

The interesting decision here isn't which components to build — it's
overriding the landing-page category's default preset based on the stated
audience, exactly as `references/intent-taxonomy.md` instructs. A skill that
mechanically applied "landing page → Stripe-style polish" regardless of
audience would produce a page that undersells credibility to a skeptical
technical buyer. This is also why `intent-taxonomy.ts`'s `notes` field exists
per category — it's where "here's when to deviate from the default" lives.
