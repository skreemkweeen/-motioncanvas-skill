/**
 * Extracted from examples/analytics-dashboard/data-table.tsx's original
 * inline empty state — generalized to any data region, not just a table.
 * `role="status"` so assistive tech is told the region resolved to "no
 * data" rather than silently rendering nothing.
 */
import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-2 px-4 py-12 text-center"
    >
      <p className="text-sm font-medium text-card-foreground">{title}</p>
      {description ? (
        <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action}
    </div>
  );
}
