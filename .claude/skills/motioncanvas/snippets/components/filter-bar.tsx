/**
 * Generalized from examples/analytics-dashboard/filter-bar.tsx's original
 * hardcoded 24h/7d/30d range + Production/Staging/Development select into
 * a real reusable pair: a controlled segmented control (any set of string
 * options, not just date ranges) plus a `children` slot for whatever
 * additional filter controls a given page needs.
 */
import type { ReactNode } from "react";

export interface SegmentedControlProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-md border border-border bg-card p-0.5"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className={`rounded px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            value === option
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export interface FilterBarProps {
  children: ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return <div className="flex flex-wrap items-center gap-3 px-6 py-4">{children}</div>;
}
