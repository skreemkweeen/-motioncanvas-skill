export function Topbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          API usage and reliability across all environments.
        </p>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
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
      </div>
    </header>
  );
}
