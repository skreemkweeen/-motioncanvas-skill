// Runs the command-registry drift check — see commands/validate.ts for
// what it actually checks (every file path referenced by SKILL_COMMANDS
// genuinely exists).
import { execFileSync } from "node:child_process";
import path from "node:path";
import { buildTools } from "./build-tools.mjs";

const outDir = buildTools();
const entry = path.join(outDir, "commands", "validate.js");
execFileSync("node", [entry], { stdio: "inherit" });
