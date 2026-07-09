"use client";

import { useState } from "react";
import {
  FilterBar as SharedFilterBar,
  SegmentedControl,
} from "../../snippets/components/filter-bar";

export function FilterBar() {
  const [range, setRange] = useState("7d");

  return (
    <SharedFilterBar>
      <SegmentedControl
        label="Date range"
        options={["24h", "7d", "30d"]}
        value={range}
        onChange={setRange}
      />
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Environment
        <select className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <option>Production</option>
          <option>Staging</option>
          <option>Development</option>
        </select>
      </label>
    </SharedFilterBar>
  );
}
