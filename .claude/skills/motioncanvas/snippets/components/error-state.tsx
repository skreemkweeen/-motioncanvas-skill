/**
 * Extracted from examples/analytics-dashboard/data-table.tsx's original
 * inline error state — generalized to any data region. `role="alert"` so
 * assistive tech is told immediately, without the user needing to
 * discover the failure by scanning.
 */
export interface ErrorStateProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Retry",
}: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <p className="text-sm font-medium text-destructive">{title}</p>
      {description ? (
        <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
      ) : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
