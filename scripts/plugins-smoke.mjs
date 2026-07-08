// Runs the real plugin runtime smoke test — see
// plugins/examples/run-smoke.ts for what it actually checks.
import { execFileSync } from "node:child_process";
import path from "node:path";
import { buildTools } from "./build-tools.mjs";

const outDir = buildTools();
const entry = path.join(outDir, "plugins", "examples", "run-smoke.js");
execFileSync("node", [entry], { stdio: "inherit" });
