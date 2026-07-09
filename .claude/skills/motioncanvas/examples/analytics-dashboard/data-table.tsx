import { Fade } from "../../snippets/motion/fade";

export interface EndpointRow {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  requests: string;
  status: "healthy" | "degraded" | "down";
}

export interface DataTableProps {
  state: "loading" | "empty" | "error" | "data";
  rows?: readonly EndpointRow[];
  onRetry?: () => void;
}

// Tailwind's bg-{color}/10 opacity modifier silently produces a fully
// transparent background here: these tokens are plain hex strings
// (snippets/tokens.css), not the "R G B" triplet format Tailwind's opacity
// injection expects, so there's no channel for it to inject an alpha value
// into. color-mix() operates on the resolved CSS variable directly and
// needs no such format — a real fix, not a workaround, and it composes
// correctly with dark mode since --color-success etc. already swap per
// theme.
const statusTint: Record<EndpointRow["status"], string> = {
  healthy: "var(--color-success)",
  degraded: "var(--color-warning)",
  down: "var(--color-destructive)",
};

const statusTextClass: Record<EndpointRow["status"], string> = {
  healthy: "text-success",
  degraded: "text-warning",
  down: "text-destructive",
};

export function DataTable({ state, rows = [], onRetry }: DataTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-medium text-card-foreground">Top endpoints</h3>
      </div>

      {state === "loading" && <LoadingRows />}
      {state === "empty" && <EmptyState />}
      {state === "error" && <ErrorState onRetry={onRetry} />}
      {state === "data" && <DataRows rows={rows} />}
    </div>
  );
}

function LoadingRows() {
  return (
    <div aria-live="polite" aria-busy="true" className="space-y-3 p-4">
      <span className="sr-only">Loading endpoint data</span>
      {[0, 1, 2, 3].map((index) => (
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

function EmptyState() {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-2 px-4 py-12 text-center"
    >
      <p className="text-sm font-medium text-card-foreground">No requests yet</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Once your app starts sending traffic, its busiest endpoints will show up here.
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <p className="text-sm font-medium text-destructive">
        Couldn&apos;t load endpoint data
      </p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Something went wrong fetching this data. Try again, or check back shortly.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Retry
      </button>
    </div>
  );
}

function DataRows({ rows }: { rows: readonly EndpointRow[] }) {
  return (
    <Fade className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="sr-only">Top API endpoints by request volume</caption>
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th scope="col" className="px-4 py-2 font-medium">
              Endpoint
            </th>
            <th scope="col" className="px-4 py-2 font-medium">
              Method
            </th>
            <th scope="col" className="px-4 py-2 font-medium">
              Requests
            </th>
            <th scope="col" className="px-4 py-2 font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.path} className="border-b border-border last:border-0">
              <td className="px-4 py-2 font-mono text-xs text-card-foreground">
                {row.path}
              </td>
              <td className="px-4 py-2 text-muted-foreground">{row.method}</td>
              <td className="px-4 py-2 text-card-foreground">{row.requests}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusTextClass[row.status]}`}
                  style={{
                    backgroundColor: `color-mix(in srgb, ${statusTint[row.status]} 12%, transparent)`,
                  }}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fade>
  );
}
