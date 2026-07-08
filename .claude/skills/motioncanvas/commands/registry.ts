/**
 * A structured metadata catalog of this skill's own workflow entry points —
 * not a live command dispatcher. Claude Code skills don't expose custom
 * sub-commands this repo could hook into at runtime; this exists so "what
 * does this skill support, and what does each mode actually need" lives in
 * one checkable place instead of scattered prose. See validate.ts for a
 * real check that every referenced file here actually exists.
 */

export type SkillCommandCategory = "build" | "review" | "analyze";

export interface SkillCommand {
  readonly name: string;
  readonly aliases: readonly string[];
  readonly category: SkillCommandCategory;
  readonly description: string;
  readonly examples: readonly string[];
  /** Provider source files (relative to the skill root) this mode typically draws on. */
  readonly requiredProviders: readonly string[];
  /** Reference/doc files (relative to the skill root) this mode reads. */
  readonly requiredPromptModules: readonly string[];
}

export const SKILL_COMMANDS: readonly SkillCommand[] = [
  {
    name: "build",
    aliases: ["create", "generate", "add"],
    category: "build",
    description:
      "The default workflow: build or extend UI in a React/Next.js codebase, following SKILL.md's pipeline.",
    examples: [
      "build a landing page for...",
      "add a pricing section",
      "make this hero feel more premium",
    ],
    requiredProviders: [
      "providers/local-component-registry.ts",
      "providers/local-motion-library.ts",
    ],
    requiredPromptModules: [
      "SKILL.md",
      "references/design-system.md",
      "references/motion-principles.md",
      "references/review-pipeline.md",
      "references/quality-checklist.md",
    ],
  },
  {
    name: "critique",
    aliases: ["review", "audit", "evaluate"],
    category: "review",
    description:
      "Review-only mode: evaluate an existing UI, no code changes unless asked.",
    examples: [
      "review this component",
      "what's wrong with this page",
      "audit our design system",
    ],
    requiredProviders: [],
    requiredPromptModules: [
      "references/design-critique-mode.md",
      "references/quality-checklist.md",
    ],
  },
  {
    name: "profile",
    aliases: ["analyze", "inspect-repo"],
    category: "analyze",
    description:
      "Repo-intelligence pass producing a ProjectProfile before a larger build.",
    examples: ["what does this project's design system look like?"],
    requiredProviders: [],
    requiredPromptModules: ["analysis/README.md", "analysis/project-profile.ts"],
  },
];
