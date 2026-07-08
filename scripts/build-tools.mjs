// Shared build step for the plugin smoke test and the command-registry
// validator: compiles plugins/, commands/, and the providers/ files they
// need to ESM in a throwaway dist-tools/ directory (not shipped, not
// committed — see tsconfig.tools.json), then copies the plugin examples'
// fixture data alongside the compiled output (tsc only emits .ts -> .js).
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import path from "node:path";

export function buildTools() {
  const root = process.cwd();
  const outDir = path.join(root, "dist-tools");
  const skillRoot = path.join(root, ".claude/skills/motioncanvas");

  rmSync(outDir, { recursive: true, force: true });

  execFileSync("npx", ["tsc", "-p", "tsconfig.tools.json"], { stdio: "inherit" });

  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    path.join(outDir, "package.json"),
    `${JSON.stringify({ type: "module" })}\n`,
  );

  cpSync(
    path.join(skillRoot, "plugins/examples/fixtures"),
    path.join(outDir, "plugins/examples/fixtures"),
    { recursive: true },
  );

  return outDir;
}
