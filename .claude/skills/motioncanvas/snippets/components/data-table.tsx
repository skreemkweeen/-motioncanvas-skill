/**
 * Generalized from examples/analytics-dashboard/data-table.tsx's original
 * EndpointRow-specific table into a real generic component — any row shape
 * `T`, caller-defined columns, same required loading/empty/error/data
 * states (references/intent-taxonomy.md's `dashboard` category calls
 * these out as core features, not optional polish).
 */
import type { ReactNode } from "react";
import { Fade } from "../motion/fade";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { LoadingSkeleton } from "./loading-skeleton";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  title: string;
  /** Screen-reader-only <caption> — describes the data, not just the UI chrome. */
  caption: string;
  state: "loading" | "empty" | "error" | "data";
  columns: readonly DataTableColumn<T>[];
  rows?: readonly T[];
  getRowKey: (row: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
  onRetry?: () => void;
}

export function DataTable<T>({
  title,
  caption,
  state,
  columns,
  rows = [],
  getRowKey,
  emptyTitle = "No data yet",
  emptyDescription,
  errorTitle = "Couldn't load this data",
  errorDescription,
  onRetry,
}: DataTableProps<T>) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-medium text-card-foreground">{title}</h3>
      </div>

      {state === "loading" && (
        <LoadingSkeleton label={`Loading ${title.toLowerCase()}`} />
      )}
      {state === "empty" && (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
      {state === "error" && (
        <ErrorState title={errorTitle} description={errorDescription} onRetry={onRetry} />
      )}
      {state === "data" && (
        <Fade className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                {columns.map((column) => (
                  <th key={column.key} scope="col" className="px-4 py-2 font-medium">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={getRowKey(row)} className="border-b border-border last:border-0">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-2 text-card-foreground">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Fade>
      )}
    </div>
  );
}
