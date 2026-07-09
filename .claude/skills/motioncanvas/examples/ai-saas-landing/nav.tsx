"use client";

import { useEffect, useState, type SVGProps } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useMotionPreferences } from "../../snippets/motion-provider";
import { PremiumButton } from "../../snippets/button.example";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
];

export function Nav() {
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-sm font-semibold tracking-tight text-white">
          Fieldnote
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded text-sm text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {link.label}
            </a>
          ))}
          <PremiumButton className="px-4 py-2 text-xs">Start free trial</PremiumButton>
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <PremiumButton className="w-full justify-center">
              Start free trial
            </PremiumButton>
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
