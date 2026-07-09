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
