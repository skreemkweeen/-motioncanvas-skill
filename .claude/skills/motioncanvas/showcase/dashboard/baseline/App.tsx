/**
 * The "baseline" side of this showcase: a plausible default/unguided
 * generation for the same request (see ../prompt.md) — same product, same
 * data, so the comparison isolates implementation quality. No dark mode, no
 * loading/empty/error states (just the "happy path" data), a plain HTML
 * table, and a sidebar with no responsive treatment — all genuinely common
 * defaults, not an exaggeration. See ../README.md for the specific gaps
 * this surfaces.
 */
const endpoints = [
  { path: "/v1/transcripts", method: "POST", requests: "412,038", status: "healthy" },
  { path: "/v1/recaps", method: "GET", requests: "298,114", status: "healthy" },
  { path: "/v1/action-items", method: "GET", requests: "184,552", status: "degraded" },
  { path: "/v1/webhooks/tracker", method: "POST", requests: "96,201", status: "healthy" },
  { path: "/v1/exports", method: "POST", requests: "12,048", status: "down" },
];

const metrics = [
  { label: "Active users", value: "24,318", change: "+4.2%" },
  { label: "API requests", value: "1.82M", change: "+2.7%" },
  { label: "Error rate", value: "0.31%", change: "-0.6%" },
  { label: "P95 latency", value: "182ms", change: "-3.1%" },
];

export function App() {
  return (
    <div style={{ display: "flex", fontFamily: "system-ui, sans-serif", color: "#000" }}>
      <div
        style={{
          width: "200px",
          borderRight: "1px solid #ddd",
          padding: "16px",
          minHeight: "100vh",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "16px" }}>Pulse</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <a href="#" style={{ color: "#333", textDecoration: "none" }}>
            Overview
          </a>
          <a href="#" style={{ color: "#333", textDecoration: "none" }}>
            Requests
          </a>
          <a href="#" style={{ color: "#333", textDecoration: "none" }}>
            Alerts
          </a>
          <a href="#" style={{ color: "#333", textDecoration: "none" }}>
            Settings
          </a>
        </div>
      </div>

      <div style={{ flex: 1, padding: "24px" }}>
        <h1 style={{ fontSize: "24px", margin: "0 0 4px" }}>Overview</h1>
        <p style={{ color: "#666", margin: "0 0 24px" }}>
          API usage and reliability across all environments.
        </p>

        <div style={{ marginBottom: "16px" }}>
          <button
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              marginRight: "8px",
              cursor: "pointer",
            }}
          >
            7d
          </button>
          <select style={{ padding: "6px" }}>
            <option>Production</option>
            <option>Staging</option>
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "4px" }}
            >
              <div style={{ color: "#666", fontSize: "14px" }}>{metric.label}</div>
              <div style={{ fontSize: "22px", fontWeight: "bold", margin: "8px 0" }}>
                {metric.value}
              </div>
              <div style={{ fontSize: "13px", color: "#666" }}>{metric.change}</div>
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #ddd",
              fontWeight: "bold",
            }}
          >
            Top endpoints
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <tbody>
              {endpoints.map((row) => (
                <tr key={row.path} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px 16px", fontFamily: "monospace" }}>
                    {row.path}
                  </td>
                  <td style={{ padding: "8px 16px", color: "#666" }}>{row.method}</td>
                  <td style={{ padding: "8px 16px" }}>{row.requests}</td>
                  <td style={{ padding: "8px 16px" }}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
