# Plugin system

A small, real, in-process plugin runtime — not a marketplace, not a
sandboxed execution environment. A plugin is a TypeScript object
(`types.ts`'s `Plugin` interface) that a `PluginRegistry` (`registry.ts`)
registers, version-checks, dependency-resolves, and enables/disables.

## Core pieces

- **`types.ts`** — the `Plugin` contract: metadata, a declarative config
  schema, and `initialize()`/`configure()`/`execute()`/`dispose()`.
- **`registry.ts`** — `PluginRegistry`: registration with a version-
  compatibility check (`satisfiesRange`, a small honestly-scoped subset of
  semver — see its doc comment for exactly which range forms are
  supported), config validation, dependency resolution via topological sort
  with cycle detection, and enable/disable state.
- **`discover.ts`** — real filesystem auto-discovery: scans a directory for
  `*.plugin.{ts,js,mjs}` files and dynamically imports + registers each
  one's default export. This is a Node-side dev-time convenience (a build
  script, a CLI) — it is never bundled into a browser build.
- **`examples/`** — real plugins wrapping the providers in `providers/` (mock,
  a local-JSON-catalog example standing in for 21st.dev, Figma, Spline, an
  aggregator that depends on two of the others, plus the local component
  registry and motion catalog), plus `run-smoke.ts` — an actually-executed
  smoke test, not just a typechecked
  stub. Run it with `npm run plugins:smoke` from the repo root.

## Enabling plugins with dependencies

`PluginRegistry.enable(id, config)` only passes `config` to the plugin you
named — any dependencies it pulls in transitively are enabled with an empty
config. This means **enable a plugin's dependencies first, with their own
config, before enabling a plugin that depends on them**:

```ts
await registry.enable("example-mock-inspiration");
await registry.enable("example-21st-dev", { catalogPath: "..." });
await registry.enable("example-aggregator"); // deps already enabled — this just configures the aggregator itself
```

If you enable a dependent before its dependencies, and those dependencies
need required config, `enable()` throws — it won't guess a dependency's
settings on your behalf.

## What's real vs. not

- The registry, dependency resolution, version checking, config validation,
  and filesystem discovery are all real and exercised by
  `examples/run-smoke.ts`.
- There is no plugin sandboxing, no permission system, no marketplace/CDN
  install step, and no dynamic loading of untrusted third-party code beyond
  "import a file from a directory you pointed it at." Don't describe this as
  more than it is.

## Adding a new plugin

1. Write a `*.plugin.ts` file default-exporting a `Plugin`. If it wraps a
   provider (see `../providers/README.md`), create the provider instance
   inside `configure()` once you have the config, not at module load time.
2. Add it to `examples/` (or your own directory) and, if you want it
   auto-discovered, make sure the filename matches `*.plugin.{ts,js,mjs}`.
3. If it depends on another plugin, list that plugin's id in
   `metadata.dependencies` — `registry.enable()` will pull it in first.
4. Run `npm run typecheck && npm run lint`, and extend
   `examples/run-smoke.ts` (or add your own smoke script) to actually
   exercise it — a plugin that's never been run is not a plugin that works.
