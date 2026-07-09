# Provider architecture

A small interface layer so "where does inspiration/components/motion
metadata/templates/assets come from" is decoupled from the core SKILL.md
workflow — a new source can be added as a file in this directory without
touching SKILL.md or any of the reference docs.

## Status

| Provider                    | Interface                        | Real implementation(s)                                                                                                                                                                                                                                                               | Why                                                                                                                                                                                                            |
| --------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ComponentRegistryProvider` | `component-registry-provider.ts` | `local-component-registry.ts`                                                                                                                                                                                                                                                        | Pure bookkeeping over metadata the skill itself produces — no external dependency needed to function.                                                                                                          |
| `MotionLibraryProvider`     | `motion-library-provider.ts`     | `local-motion-library.ts`                                                                                                                                                                                                                                                            | A static catalog of this repo's own `snippets/motion/` primitives — real data, already known.                                                                                                                  |
| `DesignInspirationProvider` | `design-inspiration-provider.ts` | `local-json-design-inspiration-provider.ts` (backs 21st.dev/Magic UI/Aceternity UI — a user-curated local JSON catalog, no scraping), `figma-design-inspiration-provider.ts` (real Figma REST API client, token-gated), `mock-design-inspiration-provider.ts` (explicit test double) | Real where a real integration exists (Figma's official API) or a local-data pattern is honest (a curated catalog standing in for a source with no public API) — still no live scraping of Mobbin/Awwwards/etc. |
| `TemplateProvider`          | `template-provider.ts`           | none                                                                                                                                                                                                                                                                                 | Only one reference example exists so far (`examples/ai-saas-landing/`); a provider abstraction over a single entry has no real caller yet.                                                                     |
| `AssetProvider`             | `asset-provider.ts`              | `spline-asset-provider.ts` (real local-file `.splinecode` listing/resolution — no network, no fabricated scenes)                                                                                                                                                                     | Real for "list/resolve files a user actually exported"; still no way to fetch or generate a scene that doesn't exist locally.                                                                                  |

Most providers are genuinely functional today, within the scope documented
above. `TemplateProvider` remains a contract only — implementing it for real
is future work, not something to fake with a stub that returns empty arrays
and calls it done. See `../plugins/README.md` for how these get wired
together with lifecycle/discovery — that's a separate concern from the
providers themselves.

## Adding a new provider implementation

1. Pick the interface it satisfies (or add a new interface file here if it's
   a genuinely new domain — follow the pattern in `types.ts`: a `Provider<TQuery,
TResult>` base plus whatever extra methods the domain needs).
2. Implement it in a new file — e.g. `local-json-design-inspiration-provider.ts`
   is the pattern for "no public API, so read a user-curated local catalog
   instead," and `figma-design-inspiration-provider.ts` is the pattern for
   "a real official API exists." It must:
   - Only return data it actually has (a real API response, a real local
     file, user-supplied content) — never fabricate results.
   - Be explicit in its own doc comment about what's live vs. cached vs.
     heuristic (see `score()`'s doc in `design-inspiration-provider.ts`).
   - Not require changes to `SKILL.md`, other providers, or the core motion
     library to work — that's the point of the interface boundary.
3. Wire it into the relevant workflow step in `SKILL.md` only once it's a
   real, working implementation — don't reference a provider from the main
   workflow while it's still interface-only.

## What this is not

Providers are data/interface contracts — not a dependency-injection
framework and not, by themselves, a lifecycle runtime. `plugins/` is where
`initialize()`/`configure()`/`execute()`/`dispose()` lifecycle, dependency
resolution, and discovery actually live, wrapping a provider instance rather
than duplicating this layer. Keep that separation: a provider should stay
usable directly (as the smoke test's fixtures do) without requiring the
plugin runtime to exist.
