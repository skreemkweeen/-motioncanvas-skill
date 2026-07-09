"use client";

/**
 * Shared motion context for a project: one reduced-motion source of truth,
 * and a LazyMotion feature bundle so components can use the small `m.*`
 * components instead of the full `motion.*` bundle (smaller client JS).
 *
 * Usage: wrap the app (or a route subtree) once:
 *
 *   <MotionProvider>{children}</MotionProvider>
 *
 * Inside animated components, import `m` from "framer-motion" (not `motion`)
 * and read `useMotionPreferences()` for the reduced-motion flag.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { LazyMotion, domAnimation, useReducedMotion } from "framer-motion";

interface MotionContextValue {
  reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
});

export function useMotionPreferences(): MotionContextValue {
  return useContext(MotionContext);
}

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  const value = useMemo<MotionContextValue>(
    () => ({ reducedMotion: Boolean(prefersReducedMotion) }),
    [prefersReducedMotion],
  );

  return (
    <MotionContext.Provider value={value}>
      {/* strict mode forces every animated element to use `m.*`, which keeps
          the LazyMotion bundle-size win honest across the codebase */}
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionContext.Provider>
  );
}
