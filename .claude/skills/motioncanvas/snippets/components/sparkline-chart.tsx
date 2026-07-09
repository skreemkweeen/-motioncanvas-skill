/**
 * Extracted from examples/analytics-dashboard/sparkline-chart.tsx —
 * already fully generic, moved here as-is. A real, dependency-free inline
 * SVG bar chart — not a charting library dependency, and not a
 * placeholder image; see references/roadmap.md's "no unjustified new
 * dependencies" rule. Ships a real, visually-hidden data table alongside
 * the SVG, since a chart's pixels convey no information to a screen
 * reader and an `aria-label` summary can't express point-by-point values.
 */
export interface SparklineChartProps {
  title: string;
  labels: readonly string[];
  values: readonly number[];
}

export function SparklineChart({ title, labels, values }: SparklineChartProps) {
  const max = Math.max(...values, 1);
  const barWidth = 100 / values.length;

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h3 className="text-sm font-medium text-card-foreground">{title}</h3>
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden
        className="mt-4 h-32 w-full"
      >
        {values.map((value, index) => {
          const height = (value / max) * 36;
          return (
            <rect
              key={index}
              x={index * barWidth + barWidth * 0.15}
              y={40 - height}
              width={barWidth * 0.7}
              height={height}
              rx={0.6}
              className="fill-primary"
            />
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Period</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <tr key={index}>
              <td>{labels[index]}</td>
              <td>{value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
