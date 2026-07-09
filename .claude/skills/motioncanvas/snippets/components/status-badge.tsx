/**
 * Extracted from examples/analytics-dashboard/data-table.tsx's original
 * status pill. Uses color-mix() against the resolved CSS variable rather
 * than Tailwind's bg-{color}/10 opacity-modifier syntax, which silently
 * produces a fully transparent background against this skill's
 * CSS-variable-based color tokens — see tokens/README.md's "A real gotcha"
 * section for the full story.
 */
export type StatusTone = "success" | "warning" | "destructive" | "neutral";

const toneVar: Record<StatusTone, string> = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  destructive: "var(--color-destructive)",
  neutral: "var(--color-muted-foreground)",
};

const toneTextClass: Record<StatusTone, string> = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  neutral: "text-muted-foreground",
};

export interface StatusBadgeProps {
  tone: StatusTone;
  children: string;
}

export function StatusBadge({ tone, children }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${toneTextClass[tone]}`}
      style={{ backgroundColor: `color-mix(in srgb, ${toneVar[tone]} 12%, transparent)` }}
    >
      {children}
    </span>
  );
}
