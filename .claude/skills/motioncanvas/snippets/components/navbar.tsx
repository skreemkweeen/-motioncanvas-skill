"use client";

/**
 * Generalized from examples/ai-saas-landing/nav.tsx's original hardcoded
 * "Fieldnote" brand, nav-link list, and repeated `PremiumButton` calls
 * into a real reusable top nav: any brand/links, and a `renderCta`
 * render-prop since the desktop and mobile-disclosure CTA usually need
 * different sizing (see examples/ai-saas-landing/nav.tsx's own two
 * differently-classed `PremiumButton` calls this replaces).
 */
import { useEffect, useState, type ReactNode, type SVGProps } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useMotionPreferences } from "../motion-provider";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  brand: ReactNode;
  links: readonly NavLink[];
  renderCta: (variant: "desktop" | "mobile") => ReactNode;
  /** Tailwind classes for the header background/border — defaults suit a dark hero. */
  className?: string;
}

export function Navbar({
  brand,
  links,
  renderCta,
  className = "border-b border-white/10 bg-neutral-950/80 backdrop-blur",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { reducedMotion } = useMotionPreferences();

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 ${className}`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-sm font-semibold tracking-tight text-white">
          {brand}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded text-sm text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {link.label}
            </a>
          ))}
          {renderCta("desktop")}
        </nav>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="rounded p-2 text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:hidden"
        >
          <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
          <MenuIcon open={isMobileMenuOpen} aria-hidden className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <m.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="flex flex-col gap-4 overflow-hidden border-t border-white/10 px-6 py-4 sm:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            {renderCta("mobile")}
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
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
