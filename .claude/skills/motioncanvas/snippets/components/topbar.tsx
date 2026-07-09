/**
 * Generalized from examples/analytics-dashboard/topbar.tsx's original
 * hardcoded "Overview" title and search/avatar markup into a real
 * reusable page header: any title/description, any actions slot (search,
 * avatar, buttons — whatever a given page needs).
 */
import type { ReactNode } from "react";

export interface TopbarProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function Topbar({ title, description, actions }: TopbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="hidden items-center gap-3 sm:flex">{actions}</div>
      ) : null}
    </header>
  );
}
