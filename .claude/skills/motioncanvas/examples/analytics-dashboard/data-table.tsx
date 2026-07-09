/**
 * Domain-specific wrapper around the shared, generic
 * snippets/components/data-table.tsx — this file only defines what an
 * "endpoint row" looks like and how to render its columns; the actual
 * table/loading/empty/error machinery is the shared component.
 */
import { DataTable, type DataTableColumn } from "../../snippets/components/data-table";
import { StatusBadge } from "../../snippets/components/status-badge";

export interface EndpointRow {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  requests: string;
  status: "healthy" | "degraded" | "down";
}

const statusTone: Record<EndpointRow["status"], "success" | "warning" | "destructive"> = {
  healthy: "success",
  degraded: "warning",
  down: "destructive",
};

const columns: readonly DataTableColumn<EndpointRow>[] = [
  {
    key: "path",
    header: "Endpoint",
    render: (row) => <span className="font-mono text-xs">{row.path}</span>,
  },
  {
    key: "method",
    header: "Method",
    render: (row) => <span className="text-muted-foreground">{row.method}</span>,
  },
  { key: "requests", header: "Requests", render: (row) => row.requests },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <StatusBadge tone={statusTone[row.status]}>{row.status}</StatusBadge>
    ),
  },
];

export interface EndpointsTableProps {
  state: "loading" | "empty" | "error" | "data";
  rows?: readonly EndpointRow[];
  onRetry?: () => void;
}

export function EndpointsTable({ state, rows, onRetry }: EndpointsTableProps) {
  return (
    <DataTable
      title="Top endpoints"
      caption="Top API endpoints by request volume"
      state={state}
      columns={columns}
      rows={rows}
      getRowKey={(row) => row.path}
      emptyTitle="No requests yet"
      emptyDescription="Once your app starts sending traffic, its busiest endpoints will show up here."
      errorTitle="Couldn't load endpoint data"
      errorDescription="Something went wrong fetching this data. Try again, or check back shortly."
      onRetry={onRetry}
    />
  );
}
