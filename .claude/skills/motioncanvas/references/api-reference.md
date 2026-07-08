# Public API reference

Every exported symbol under `snippets/`, `providers/`, `plugins/`,
`commands/`, `tokens/`, and `analysis/`, classified so a consumer (someone
copying this skill into a project, or extending it) knows what's a stable
contract versus internal plumbing. This repo has no published package and no
semver — "public" here means "the intended surface to import or copy," not
"guaranteed not to change without a major version bump." See
`CONTRIBUTING.md`'s "No breaking changes to existing exported names/types"
rule for the actual stability guarantee.

Four categories, used consistently below:

- **Public** — the intended surface. Safe to import (in a project that keeps
  this skill's source alongside its own code) or copy into a target project.
- **Internal** — implementation detail of this skill's own tooling/build. Not
  meant to be imported by a target project; changing it doesn't require the
  same care as a Public symbol.
- **Interface-only** — a contract with no shipped implementation. Not
  experimental (nothing partially works) and not deprecated (nothing is being
  removed) — just an honest gap, documented as such at the point of
  definition. See `references/roadmap.md`.
- **Deprecated** — none exist yet. This skill hasn't shipped a release to
  deprecate anything from.

## `snippets/` — Public

The copy-into-your-project layer. Every component, hook, and token export
here is Public: `MotionProvider`/`useMotionPreferences`
(`motion-provider.tsx`), `useMagneticButton`, `usePremiumScroll`,
`PremiumButton` (the worked example in `button.example.tsx`), and all twelve
`snippets/motion/` primitives with their `*Props` types (`Fade`, `Slide`,
`Reveal`, `ScrollReveal`, `StaggerContainer`/`StaggerItem`, `HeroReveal`,
`SpotlightFollow`, `AnimatedBorder`, `FloatingCard`, `CursorGlow`,
`AuroraBackground`), plus `snippets/motion/tokens.ts`'s
`duration`/`ease`/`spring`/`distance`/`stagger`/`directionToOffset` and
`snippets/motion/presets.ts`'s eight named presets and `motionPresets`
lookup object. `snippets/motion/index.ts` re-exports all of the above as one
barrel for convenience when copying the whole directory at once.

The generated files (`tokens.css`, `tokens.json`, `design-tokens.ts`,
`tailwind-theme-extension.ts`) are Public output, not hand-authored Public
API — see `tokens/README.md` for the actual source of truth.

## `providers/` — mixed

| Symbol                                                                                                            | Kind                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Provider<TQuery, TResult>`, `ProviderMetadata` (`types.ts`)                                                      | Public — the base contract any new provider implements                                                      |
| `DesignInspirationProvider`, `DesignInspirationQuery`, `DesignInspirationResult`                                  | Public interface                                                                                            |
| `ComponentRegistryProvider`, `ComponentQuery`, `RegisteredComponentMetadata`, `ComponentCategory`                 | Public interface                                                                                            |
| `MotionLibraryProvider`, `MotionQuery`, `MotionPrimitiveMetadata`                                                 | Public interface                                                                                            |
| `AssetProvider`, `AssetQuery`, `AssetMetadata`, `AssetKind`                                                       | Public interface                                                                                            |
| `TemplateProvider`, `TemplateQuery`, `TemplateMetadata`                                                           | **Interface-only** — no implementation ships; see `providers/README.md`'s status table                      |
| `createLocalComponentRegistry()`                                                                                  | Public — real in-memory implementation                                                                      |
| `createLocalMotionLibrary()`                                                                                      | Public — real static catalog                                                                                |
| `createLocalJsonDesignInspirationProvider(...)`, `LocalCatalogEntry`, `LocalJsonDesignInspirationProviderOptions` | Public — real, user-curated-catalog pattern                                                                 |
| `createFigmaDesignInspirationProvider(...)`, `FigmaProviderOptions`                                               | Public — real Figma REST client, token-gated                                                                |
| `mapFigmaComponentsToResults(...)`, `FigmaComponentsResponse`                                                     | Public — pure mapping function, useful standalone for testing/inspection                                    |
| `createSplineAssetProvider(...)`, `SplineAssetProviderOptions`                                                    | Public — real local `.splinecode` file resolution                                                           |
| `createMockDesignInspirationProvider()`                                                                           | Public but explicitly a test double — safe to use as a smoke-test fixture, not as a real inspiration source |

## `plugins/` — mixed

| Symbol                                                                                              | Kind                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Plugin`, `PluginMetadata`, `PluginConfigField`, `PluginConfigSchema`, `PluginContext` (`types.ts`) | Public — the contract anyone writing a new plugin implements                                                                                                                             |
| `PluginRegistry`, `PLUGIN_API_VERSION` (`registry.ts`)                                              | Public — the real runtime                                                                                                                                                                |
| `satisfiesRange`, `compareVersions`, `parseVersion`, `validateConfig` (`registry.ts`)               | Public — useful standalone (e.g. a caller checking compatibility before calling `enable()`)                                                                                              |
| `discoverPlugins()` (`discover.ts`)                                                                 | Public — real filesystem discovery, Node-side only (see its own doc comment: never bundled into a browser build)                                                                         |
| `plugins/examples/*.plugin.ts` default exports and named `provider` exports                         | Internal — reference implementations proving the runtime works end to end (`npm run plugins:smoke`), not meant to be imported by a target project as-is. Copy the pattern, not the file. |

## `commands/` — Public

`SKILL_COMMANDS`, `SkillCommand`, `SkillCommandCategory` (`registry.ts`) are
Public — the metadata catalog documented in `commands/README.md`.
`validateCommandRegistry()` and `RegistryDriftIssue` (`validate.ts`) are
Internal — a repo-maintenance check (`npm run validate:registry`), not
something a target project would import.

## `tokens/` — mixed

`designTokens` and its supporting types (`DesignTokens`, `ColorTokens`,
`TypographyToken`, `TypographyScale`, `SpacingScale`, `RadiusScale`,
`ShadowScale`) in `design-tokens.ts` are Public — the single source of truth.
`compileToCss()`, `compileToTailwindTheme()`/`TailwindThemeExtension`,
`compileToTypeDeclarations()`, and `compileToJson()` are Internal — build-time
compiler functions run by `npm run tokens:build`, not meant to be imported
piecemeal by a target project (the project consumes their _output_, i.e.
`snippets/tokens.css` and friends, which is Public — see above).

## `analysis/` — Public

`ProjectProfile` and `summarizeProjectProfile()` (`project-profile.ts`),
`CreativeBrief` and `summarizeCreativeBrief()` (`creative-brief.ts`), and
`IntentCategory`/`IntentCategoryId`/`MotionPresetRecommendation`/
`INTENT_CATEGORIES` (`intent-taxonomy.ts`) are all Public — data shapes and
rendering helpers meant to be filled in and consulted directly as part of the
workflow's Intent and Research stages (see `SKILL.md`'s Workflow section).
None of these scan or classify automatically; see each file's own doc
comment for exactly what fills them in.
