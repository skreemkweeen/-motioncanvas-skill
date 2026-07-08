"use client";

import { useState } from "react";

const ranges = ["24h", "7d", "30d"] as const;

export function FilterBar() {
  const [range, setRange] = useState<(typeof ranges)[number]>("7d");

  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-4">
      <div
        role="group"
        aria-label="Date range"
        className="inline-flex rounded-md border border-border bg-card p-0.5"
      >
        {ranges.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={range === value}
            onClick={() => setRange(value)}
            className={`rounded px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              range === value
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Environment
        <select className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <option>Production</option>
          <option>Staging</option>
          <option>Development</option>
        </select>
      </label>
    </div>
  );
}
