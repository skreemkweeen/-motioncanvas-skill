# Provider architecture

A small interface layer so "where does inspiration/components/motion
metadata/templates/assets come from" is decoupled from the core SKILL.md
workflow — a new source can be added as a file in this directory without
touching SKILL.md or any of the reference docs.

## Status

| Provider                    | Interface                        | Real implementation           | Why                                                                                                                                        |
| --------------------------- | -------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `ComponentRegistryProvider` | `component-registry-provider.ts` | `local-component-registry.ts` | Pure bookkeeping over metadata the skill itself produces — no external dependency needed to function.                                      |
| `MotionLibraryProvider`     | `motion-library-provider.ts`     | `local-motion-library.ts`     | A static catalog of this repo's own `snippets/motion/` primitives — real data, already known.                                              |
| `DesignInspirationProvider` | `design-inspiration-provider.ts` | none                          | Needs a real integration with an external source (21st.dev, Mobbin, Awwwards, ...) or user-supplied data; nothing here has live access.    |
| `TemplateProvider`          | `template-provider.ts`           | none                          | Only one reference example exists so far (`examples/ai-saas-landing/`); a provider abstraction over a single entry has no real caller yet. |
| `AssetProvider`             | `asset-provider.ts`              | none                          | Spline/Rive/Lottie assets must be actual exported files supplied by a user — there's nothing to catalog until one exists.                  |

Two providers are genuinely functional today. The other three are contracts
only — implementing one for real is future work, not something to fake with
a stub that returns empty arrays and calls it done.

## Adding a new provider implementation

1. Pick the interface it satisfies (or add a new interface file here if it's
   a genuinely new domain — follow the pattern in `types.ts`: a `Provider<TQuery,
TResult>` base plus whatever extra methods the domain needs).
2. Implement it in a new file, e.g. `twentyfirst-dev-provider.ts` for a real
   21st.dev integration. It must:
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

Not a plugin loader, not a dependency-injection framework, not a runtime
registry with `configure()`/`execute()` lifecycle hooks. Those add real
complexity that only pays off once there are several competing
implementations of the same interface to swap between — right now there's
at most one real implementation per interface. Reach for that machinery
later, if it's ever actually needed, rather than building it speculatively
now.
