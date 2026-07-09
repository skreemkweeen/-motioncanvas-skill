/**
 * Extracted from examples/analytics-dashboard/data-table.tsx's original
 * inline loading state — generalized to any data region. Skeleton rows
 * over a spinner per references/intent-taxonomy.md's `dashboard` category
 * notes; `aria-live`/`aria-busy` so assistive tech is told loading is in
 * progress without polling.
 */
export interface LoadingSkeletonProps {
  /** Number of skeleton rows to render. Defaults to 4. */
  rows?: number;
  label?: string;
}

export function LoadingSkeleton({ rows = 4, label = "Loading" }: LoadingSkeletonProps) {
  return (
    <div aria-live="polite" aria-busy="true" className="space-y-3 p-4">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          aria-hidden
          className="h-8 animate-pulse rounded bg-muted"
          style={{ animationDelay: `${index * 75}ms` }}
        />
      ))}
    </div>
  );
}
