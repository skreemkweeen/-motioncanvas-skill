# Walkthrough: design system generation

## Prompt

> "We're starting a new internal product and want a consistent design system
> from day one — tokens, a small component set, usage guidelines — before
> anyone starts building screens."

## Expected workflow

Matches `references/intent-taxonomy.md`'s `design-system` category directly:
"the tokens/components/documentation meant to be reused across many
products, not a single UI." Its own notes are explicit that the deliverable
here is largely this skill's own `tokens/`/`snippets/motion/` tooling,
adapted into the target project's package — not new product screens.

1. **Intent + requirements** — audience is "other engineers/designers
   consuming the system," per the taxonomy entry — the design decisions here
   optimize for consistency and documentation clarity, not a single
   audience-facing conversion goal the way a landing page would.
2. **Design tokens** — start from `tokens/design-tokens.ts`'s shape
   (`TypographyScale`, `SpacingScale`, `RadiusScale`, `ShadowScale`,
   `ColorTokens`) as the pattern for the new project's own token file, not a
   copy of this repo's actual values — every real project's palette/scale is
   its own decision. Compile to CSS custom properties, a Tailwind theme
   extension object, and TypeScript types the same way `tokens/build.ts`
   does, so the new project gets the same "one source of truth, four
   compiled outputs" property this skill uses on itself.
3. **Component library** — a small set (button, card, input, a couple of
   layout primitives), each sourced via `SKILL.md`'s Component sourcing order
   and, per `references/component-composition.md` §5, registered in a
   `ComponentRegistryProvider` instance (`providers/component-registry-provider.ts`)
   if the new project wants one — so the next screen built against this
   system finds these components before anyone rebuilds them.
4. **Motion** — the whole `snippets/motion/` library is the deliverable here
   per the taxonomy entry, not a single preset pick; document which preset
   (from `snippets/motion/presets.ts`) the new product defaults to and why,
   the same way `motion-director.md` frames preset selection.
5. **Documentation** — usage guidelines and an accessibility contract per
   component (semantic HTML, keyboard behavior, reduced-motion handling),
   per the taxonomy entry's core features list.
6. **Accessibility + performance + review** — the seven-lens pipeline applies
   per-component here rather than per-page.

## Generated artifacts

- A `design-tokens.ts` (or equivalent) in the new project's own structure,
  compiled to CSS/Tailwind/TypeScript following this repo's `tokens/`
  pattern.
- A handful of documented, registered components (button/card/input/layout
  primitives), each with usage examples and an accessibility note.
- A short design-system README covering token rationale, component usage,
  and the chosen motion preset — the design-system equivalent of
  `examples/ai-saas-landing/README.md`'s reasoning trail, scoped to a system
  rather than a page.

## Explanation

The risk this walkthrough is guarding against is treating "design system"
as "build a demo page that showcases some components" — the taxonomy entry
is explicit that layout strategy is "not applicable at the product-page
level" for this category. The actual deliverable is tooling and
documentation a team will build many future pages against, which is why this
skill's own `tokens/` and `providers/component-registry-provider.ts` are the
direct pattern to adapt, not just inspiration.
