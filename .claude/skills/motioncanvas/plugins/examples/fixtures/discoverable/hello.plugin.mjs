// Hand-authored plain JS fixture (not compiled from TS) — proves
// discoverPlugins() genuinely reads a directory and dynamically imports
// whatever matches *.plugin.{ts,js,mjs}, independent of this skill's own
// TypeScript build.
export default {
  metadata: {
    id: "example-discovered-hello",
    name: "Example: discovered hello plugin",
    version: "1.0.0",
    description:
      "Fixture proving discoverPlugins() actually imports matching files from disk.",
    capabilities: ["diagnostic"],
    compatibleWith: "^1.0.0",
  },
  configSchema: [],
  initialize() {},
  configure() {},
  execute() {
    return "hello from a discovered plugin";
  },
  dispose() {},
};
