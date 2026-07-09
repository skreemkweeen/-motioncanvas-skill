# Design token compiler

`design-tokens.ts` is the single source of truth for this skill's design
tokens. Everything else here is a pure function that compiles it into one
output format — no other file in this repo should hand-author a token
value; edit `design-tokens.ts` and regenerate.

## Compilers

- **`compile-css.ts`** → `snippets/tokens.css` — CSS custom properties,
  light + dark (the format documented in `references/design-system.md`).
- **`compile-tailwind.ts`** → `snippets/tailwind-theme-extension.ts` — a
  plain object shaped for Tailwind's `theme.extend`, referencing the same
  CSS variables rather than duplicating literal values.
- **`compile-types.ts`** → `snippets/design-tokens.ts` — TypeScript union
  types + const arrays of valid token names, for typing a prop like
  `spacing?: SpacingToken` in a target project.
- **`compile-json.ts`** → `snippets/tokens.json` — a plain JSON export for
  non-TypeScript consumers.

## Regenerating

```
npm run tokens:build
```

Compiles this directory to a throwaway build (`dist-tools/`, gitignored)
and runs it, writing the four files above directly into `snippets/` — they
are committed, since target projects copy `snippets/` directly without
running this compiler themselves. Each generated file opens with a
"GENERATED FILE — do not edit directly" header; if you find yourself
editing one, edit `design-tokens.ts` instead and rerun the build.

`npm run tokens:build` also runs Prettier on the four generated files, so
`npm run format` stays clean without hand-formatting template-string
output.

## A real gotcha: Tailwind's opacity modifier doesn't work on these colors

`bg-primary/10`, `text-success/50`, and similar Tailwind opacity-modifier
syntax silently produce a **fully transparent** color against
`tailwindThemeExtension`'s colors. They're plain hex strings referencing
`snippets/tokens.css`'s CSS custom properties (`var(--color-primary)`), not
the "R G B" space-separated triplet format Tailwind's opacity-channel
injection needs to compose an alpha value into. Found the hard way in
`showcase/dashboard/` — a status badge's `bg-success/10` rendered as
unfilled text with no background at all; see
`showcase/dashboard/VISUAL_DIFF.md`'s "What building this showcase
actually found" for the full story.

If you need a tinted/transparent variant of a token color, use
`color-mix()` against the CSS variable directly instead:

```tsx
style={{ backgroundColor: "color-mix(in srgb, var(--color-success) 12%, transparent)" }}
```

See `examples/analytics-dashboard/data-table.tsx` for a real, working
example. This isn't a limitation worth "fixing" by reformatting every
token as an RGB triplet — that would break every existing
`var(--color-x)` reference across `snippets/tokens.css` and every
component built against it for one syntax convenience.
