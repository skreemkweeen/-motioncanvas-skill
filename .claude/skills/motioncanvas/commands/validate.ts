/**
 * Real drift check: confirms every file path referenced by SKILL_COMMANDS
 * (requiredProviders, requiredPromptModules) actually exists under the
 * skill root. Catches the common failure mode of a registry entry
 * outliving a file rename or deletion. Run via `npm run validate:registry`.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { SKILL_COMMANDS } from "./registry.js";

export interface RegistryDriftIssue {
  command: string;
  missingPath: string;
}

export function validateCommandRegistry(skillRoot: string): RegistryDriftIssue[] {
  const issues: RegistryDriftIssue[] = [];

  for (const command of SKILL_COMMANDS) {
    const referenced = [...command.requiredProviders, ...command.requiredPromptModules];
    for (const relativePath of referenced) {
      if (!existsSync(path.join(skillRoot, relativePath))) {
        issues.push({ command: command.name, missingPath: relativePath });
      }
    }
  }

  return issues;
}

const skillRoot = path.join(process.cwd(), ".claude/skills/motioncanvas");
const issues = validateCommandRegistry(skillRoot);

if (issues.length > 0) {
  for (const issue of issues) {
    console.error(
      `FAIL: command "${issue.command}" references missing file: ${issue.missingPath}`,
    );
  }
  console.error(`\n${issues.length} drift issue(s) found.`);
  process.exit(1);
}

console.log(`All ${SKILL_COMMANDS.length} skill commands' referenced files exist.`);
