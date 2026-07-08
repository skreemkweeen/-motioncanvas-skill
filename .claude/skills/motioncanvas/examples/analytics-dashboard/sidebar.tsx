"use client";

import { useState, type SVGProps } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "#overview", icon: GridIcon },
  { label: "Requests", href: "#requests", icon: TableIcon },
  { label: "Alerts", href: "#alerts", icon: BellIcon },
  { label: "Settings", href: "#settings", icon: GearIcon },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("#overview");

  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <span className="text-sm font-semibold tracking-tight">Pulse</span>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="sidebar-nav"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded p-2 text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="sr-only">
            {isOpen ? "Close navigation" : "Open navigation"}
          </span>
          <MenuIcon open={isOpen} aria-hidden className="h-5 w-5" />
        </button>
      </div>

      <nav
        id="sidebar-nav"
        aria-label="Primary"
        className={`w-full shrink-0 border-b border-border bg-card px-3 py-4 md:block md:h-screen md:w-56 md:border-b-0 md:border-r md:py-6 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="mb-6 hidden px-3 text-sm font-semibold tracking-tight md:block">
          Pulse
        </div>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === active;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActive(item.href)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon aria-hidden className="h-4 w-4 shrink-0" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function MenuIcon({ open, ...props }: { open: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function GridIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function TableIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 10h18M9 4v16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.4-6.4-1.4 1.4M7 17.4l-1.4 1.4m0-13.8L7 6.6m10.4 10.4 1.4 1.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
