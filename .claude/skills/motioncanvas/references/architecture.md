# Architecture

How the pieces of this skill family fit together. Keep both diagrams in
sync with reality when adding/removing a file in `references/`,
`snippets/`, `providers/`, `plugins/`, `commands/`, `tokens/`, `examples/`,
`analysis/`, a `motioncanvas-*` skill, or a `.claude/commands/*.md` slash
command — an inaccurate diagram is worse than none.

## Skill family

```mermaid
flowchart TD
    CORE["motioncanvas-core"]
    DASH["motioncanvas-dashboard"]
    LAND["motioncanvas-landing"]
    REV["motioncanvas-review"]
    MOT["motioncanvas-motion"]
    DS["motioncanvas-design-system"]
    LIB["motioncanvas/<br/>(shared library)"]

    CORE --> LIB
    DASH --> LIB
    LAND --> LIB
    REV --> LIB
    MOT --> LIB
    DS --> LIB

    CMDS["/motioncanvas, /dashboard, /landing,<br/>/review-ui, /motion, /design-system"] -.->|"explicit invocation"| CORE
    CMDS -.-> DASH
    CMDS -.-> LAND
    CMDS -.-> REV
    CMDS -.-> MOT
    CMDS -.-> DS
```

## Shared library structure

```mermaid
flowchart TD
    SKILL["SKILL.md<br/>(shared library entry point,<br/>not typically triggered directly)"]

    SKILL --> REF["references/"]
    SKILL --> SNIP["snippets/"]
    SKILL --> PROV["providers/"]
    SKILL --> PLUG["plugins/"]
    SKILL --> CMD["commands/"]
    SKILL --> TOKENS["tokens/"]
    SKILL --> EX["examples/"]
    SKILL --> AN["analysis/"]

    REF --> DS["design-system.md"]
    REF --> MP["motion-principles.md"]
    REF --> QC["quality-checklist.md"]
    REF --> RP["review-pipeline.md<br/>(7 named lenses)"]
    REF --> DCM["design-critique-mode.md<br/>(review-only)"]
    REF --> PRDOC["providers.md"]
    REF --> EXT["extending.md"]
    REF --> PM["prompt-modules.md"]
    REF --> VIE["visual-identity-engine.md<br/>(originality scoring,<br/>anti-generic rules)"]
    REF --> EP["execution-principles.md"]

    SNIP --> MOT["motion/<br/>(12 primitives + 8 presets)"]
    SNIP --> HOOKS["MotionProvider,<br/>useMagneticButton,<br/>usePremiumScroll"]
    SNIP --> TOK["tokens.css, design-tokens.ts,<br/>tokens.json (generated)"]

    PROV --> CRP["ComponentRegistryProvider<br/>(real impl)"]
    PROV --> MLP["MotionLibraryProvider<br/>(real impl)"]
    PROV --> DIP["DesignInspirationProvider<br/>(local-JSON + Figma + mock)"]
    PROV --> TP["TemplateProvider<br/>(interface only)"]
    PROV --> AP["AssetProvider<br/>(Spline local-file impl)"]

    PLUG --> REG["registry.ts<br/>(dependency resolution,<br/>version checks)"]
    PLUG --> DISC["discover.ts<br/>(fs auto-discovery)"]
    PLUG --> PEX["examples/<br/>(wraps providers, real smoke test)"]

    CMD --> CREG["registry.ts<br/>(command metadata catalog)"]
    CMD --> CVAL["validate.ts<br/>(drift check)"]

    TOKENS --> DT["design-tokens.ts<br/>(single source of truth)"]
    TOKENS --> COMP["compile-*.ts<br/>(CSS/Tailwind/types/JSON)"]

    AN --> PP["project-profile.ts"]
    AN --> CB["creative-brief.ts"]
    AN --> VI["visual-identity.ts<br/>(KNOWN_GENERIC_PATTERNS)"]

    EX --> LAND["ai-saas-landing/<br/>(reference build)"]
    EX --> DASH["analytics-dashboard/<br/>(reference build)"]
```

## Gate sequence (each motioncanvas-* skill)

```mermaid
flowchart LR
    A["ProjectProfile<br/>(project-profile.ts)"] --> B["CreativeBrief<br/>(creative-brief.ts)"]
    B --> C["VisualIdentity<br/>(visual-identity.ts,<br/>originality score)"]
    C --> D["ComponentPlan<br/>(sourcing order)"]
    D --> E["MotionPlan<br/>(motion-director.md)"]
    E --> F["Implementation"]
    F --> G["DesignCritique<br/>(execution-principles.md,<br/>visual-identity-engine.md)"]

    A -.->|"review-only ask"| X["motioncanvas-review /<br/>design-critique-mode.md"]
```

Each skill scopes this sequence, not the order — `motioncanvas-review` runs
only ProjectProfile + DesignCritique; `motioncanvas-motion` skips
CreativeBrief/VisualIdentity/ComponentPlan since it assumes structure
already exists. See each skill's own `SKILL.md` for exactly which gates it
requires.

## What's real vs. interface-only

See `providers/README.md` for the authoritative, kept-up-to-date table.
Don't duplicate that table here — link to it instead, so there's one place
to update when a provider gets a real implementation.

## What plugins/ is (and isn't)

`plugins/` is a real, executed, in-process plugin runtime: registration,
config validation, dependency resolution, version compatibility, and
filesystem-based discovery, all exercised by `plugins/examples/run-smoke.ts`
(`npm run plugins:smoke`) — not a description of a future system. It is not
a sandbox, not a marketplace, and does not load untrusted third-party code
beyond "import a file from a directory you pointed it at." See
`plugins/README.md`.

## Not yet built

- Live providers for design-inspiration sources with no official public API
  (Mobbin, Awwwards, and 21st.dev/Magic UI/Aceternity UI beyond the
  local-catalog pattern) — see `providers/README.md`.
- A `TemplateProvider` implementation — only one reference example exists so
  far.
- Anything in the longer-term roadmap below.

## Roadmap

See `references/roadmap.md` for what comes after the current architecture
(repo intelligence, review pipeline, providers, plugins, design tokens) —
the plan is to shift toward creative-value features on top of this
foundation rather than continuing to expand the foundation itself.
