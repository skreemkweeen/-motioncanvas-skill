/**
 * Data shape for the creative brief the workflow's Intent stage produces
 * before generating anything beyond a single component — the design-intent
 * counterpart to `project-profile.ts`'s repo-intelligence artifact. Filled
 * in from the request itself (plus `references/intent-taxonomy.md`'s
 * category defaults and whatever the user actually said), not from reading
 * files. `summarizeCreativeBrief` only renders an already-filled brief into
 * a readable note.
 */

export interface CreativeBrief {
  /** What this build needs to accomplish, most important first. */
  goals: readonly string[];
  /** Real constraints — a deadline, a required stack, an existing convention to match. */
  constraints: readonly string[];
  audience: string;
  /** e.g. "confident and restrained, one accent moment" — a sentence, not a mood board. */
  visualStyle: string;
  /** How the user is expected to move through/operate this UI. */
  interactionModel: string;
  /** Anything beyond the standard quality-checklist.md bar this build specifically needs. */
  accessibilityConsiderations: readonly string[];
  /** Concrete, checkable targets where they matter (e.g. "no new client bundle >50kb"). */
  performanceTargets: readonly string[];
  /** Which motion preset (or "inherit-existing"/"not-applicable") and why. */
  animationStrategy: string;
}

export function summarizeCreativeBrief(brief: CreativeBrief): string {
  const lines: string[] = [];

  lines.push(`Goals: ${brief.goals.join("; ")}`);
  if (brief.constraints.length > 0) {
    lines.push(`Constraints: ${brief.constraints.join("; ")}`);
  }
  lines.push(`Audience: ${brief.audience}`);
  lines.push(`Visual style: ${brief.visualStyle}`);
  lines.push(`Interaction model: ${brief.interactionModel}`);
  if (brief.accessibilityConsiderations.length > 0) {
    lines.push(`Accessibility: ${brief.accessibilityConsiderations.join("; ")}`);
  }
  if (brief.performanceTargets.length > 0) {
    lines.push(`Performance targets: ${brief.performanceTargets.join("; ")}`);
  }
  lines.push(`Animation strategy: ${brief.animationStrategy}`);

  return lines.join("\n");
}
