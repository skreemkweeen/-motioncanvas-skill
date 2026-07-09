/**
 * Extracted from examples/analytics-dashboard/metric-card.tsx — already
 * fully generic (no product-specific copy), moved here as-is so future
 * showcases reuse it instead of rebuilding it.
 */
import type { SVGProps } from "react";

export interface MetricCardProps {
  label: string;
  value: string;
  /** Signed percent change, e.g. 4.2 or -1.8 — sign determines up/down styling. */
  changePercent: number;
  /** Whether an increase is good for this metric (false for e.g. error rate). */
  increaseIsGood?: boolean;
}

export function MetricCard({
  label,
  value,
  changePercent,
  increaseIsGood = true,
}: MetricCardProps) {
  const isIncrease = changePercent >= 0;
  const isGood = isIncrease === increaseIsGood;
  const toneClass = isGood ? "text-success" : "text-destructive";

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-card-foreground">
        {value}
      </p>
      <p className={`mt-1 flex items-center gap-1 text-sm ${toneClass}`}>
        <TrendIcon up={isIncrease} aria-hidden className="h-3.5 w-3.5" />
        <span>
          {Math.abs(changePercent).toFixed(1)}%
          <span className="sr-only">
            {isIncrease ? " increase" : " decrease"} vs. previous period
          </span>
        </span>
      </p>
    </div>
  );
}

function TrendIcon({ up, ...props }: { up: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      {up ? (
        <path
          d="M3 11l4-4 3 3 4-6M14 4h-3.5V7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M3 5l4 4 3-3 4 6M14 12h-3.5V8.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
