/**
 * Imports the real, shipped components from examples/analytics-dashboard/
 * directly — not a re-derivation. See ../../landing-page/after/App.tsx for
 * the same pattern applied to the first showcase.
 */
import { MotionProvider } from "../../../snippets/motion-provider";
import { Sidebar } from "../../../examples/analytics-dashboard/sidebar";
import { Topbar } from "../../../examples/analytics-dashboard/topbar";
import { FilterBar } from "../../../examples/analytics-dashboard/filter-bar";
import { MetricsSummary } from "../../../examples/analytics-dashboard/metrics-summary";
import { SparklineChart } from "../../../snippets/components/sparkline-chart";
import {
  EndpointsTable,
  type EndpointRow,
} from "../../../examples/analytics-dashboard/data-table";

const requestVolume = [420, 512, 480, 610, 705, 588, 612, 690, 754, 700, 812, 860];
const requestLabels = [
  "12am",
  "2am",
  "4am",
  "6am",
  "8am",
  "10am",
  "12pm",
  "2pm",
  "4pm",
  "6pm",
  "8pm",
  "10pm",
];

const endpoints: EndpointRow[] = [
  { path: "/v1/transcripts", method: "POST", requests: "412,038", status: "healthy" },
  { path: "/v1/recaps", method: "GET", requests: "298,114", status: "healthy" },
  { path: "/v1/action-items", method: "GET", requests: "184,552", status: "degraded" },
  { path: "/v1/webhooks/tracker", method: "POST", requests: "96,201", status: "healthy" },
  { path: "/v1/exports", method: "POST", requests: "12,048", status: "down" },
];

export function App() {
  return (
    <MotionProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <FilterBar />
          <main className="flex flex-col gap-6 px-6 pb-12">
            <MetricsSummary />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <EndpointsTable state="data" rows={endpoints} />
              </div>
              <SparklineChart
                title="Requests (last 24h)"
                labels={requestLabels}
                values={requestVolume}
              />
            </div>
          </main>
        </div>
      </div>
    </MotionProvider>
  );
}
