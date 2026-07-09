import { Fade } from "../../snippets/motion/fade";
import { MetricCard } from "../../snippets/components/metric-card";

interface Metric {
  label: string;
  value: string;
  changePercent: number;
  increaseIsGood?: boolean;
}

const metrics: Metric[] = [
  { label: "Active users", value: "24,318", changePercent: 4.2 },
  { label: "API requests", value: "1.82M", changePercent: 2.7 },
  { label: "Error rate", value: "0.31%", changePercent: -0.6, increaseIsGood: false },
  { label: "P95 latency", value: "182ms", changePercent: -3.1, increaseIsGood: false },
];

export function MetricsSummary() {
  return (
    <Fade className="grid grid-cols-2 gap-4 px-6 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </Fade>
  );
}
