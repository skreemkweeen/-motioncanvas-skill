import { Topbar as SharedTopbar } from "../../snippets/components/topbar";

export function Topbar() {
  return (
    <SharedTopbar
      title="Overview"
      description="API usage and reliability across all environments."
      actions={
        <>
          <label className="relative">
            <span className="sr-only">Search</span>
            <input
              type="search"
              placeholder="Search endpoints..."
              className="w-56 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </label>
          <div
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground"
          >
            JD
          </div>
        </>
      }
    />
  );
}
