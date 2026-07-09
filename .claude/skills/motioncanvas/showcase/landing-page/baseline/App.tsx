/**
 * The "baseline" side of this showcase: a plausible default/unguided
 * generation for the same request (see ../prompt.md) — same product, same
 * copy, so the comparison isolates implementation quality rather than
 * content. Deliberately representative, not a strawman: inline styles with
 * no shared scale, no motion, no responsive handling, browser-default focus
 * rings only, and — as would genuinely happen without a repo-intelligence
 * step — a set of independent one-off pixel values instead of a design
 * system. See ../README.md for the specific gaps this surfaces.
 */
export function App() {
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", color: "#000", background: "#fff" }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <a href="#" style={{ color: "#000", textDecoration: "none", fontWeight: "bold" }}>
          Fieldnote
        </a>
        <nav style={{ display: "flex", gap: "16px" }}>
          <a href="#features" style={{ color: "#333", textDecoration: "none" }}>
            Features
          </a>
          <a href="#demo" style={{ color: "#333", textDecoration: "none" }}>
            Demo
          </a>
          <button
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Start Free Trial
          </button>
        </nav>
      </header>

      <main>
        <section style={{ textAlign: "center", padding: "64px 24px" }}>
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "8px" }}>
            Now in public beta
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 16px" }}>
            Meeting notes that write your follow-ups
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#333",
              maxWidth: "500px",
              margin: "0 auto 24px",
            }}
          >
            Fieldnote listens to your calls, drafts the recap, and drops action items
            straight into your tracker — so the fifteen minutes after every meeting go
            back to being yours.
          </p>
          <div>
            <button
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                marginRight: "12px",
              }}
            >
              Start free trial
            </button>
            <a href="#demo" style={{ color: "#007bff" }}>
              Watch a 2-minute demo
            </a>
          </div>
        </section>

        <section id="features" style={{ padding: "48px 24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
            Everything after the call, handled
          </h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "32px" }}>
            Three things Fieldnote does automatically so your team doesn&apos;t have to.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[
              {
                title: "Live transcription",
                description:
                  "Accurate, speaker-labeled transcripts the moment the call ends.",
              },
              {
                title: "Auto-drafted recap",
                description: "A recap in your team's voice, ready to send in one click.",
              },
              {
                title: "Action items synced",
                description:
                  "Tasks land in Linear, Jira, or Asana without anyone copy-pasting.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  flex: "1 1 200px",
                  border: "1px solid #ddd",
                  padding: "16px",
                  borderRadius: "4px",
                }}
              >
                <h3 style={{ fontSize: "18px", margin: "0 0 8px" }}>{feature.title}</h3>
                <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "32px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: "0 0 8px" }}>
              Try Fieldnote on your next call
            </h2>
            <p style={{ color: "#666", margin: "0 0 16px" }}>
              No credit card. Cancel any time.
            </p>
            <button
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Start free trial
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
