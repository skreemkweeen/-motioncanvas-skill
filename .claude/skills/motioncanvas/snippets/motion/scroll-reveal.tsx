"use client";

/**
 * Component wrapper around ../use-premium-scroll — for callers who want the
 * scroll-linked fade/lift as a drop-in element instead of wiring the hook up
 * themselves. Use this for simple cases; use the hook directly when you need
 * to drive more than one motion value off the same scroll progress.
 *
 * Requires <MotionProvider> ancestor (../motion-provider).
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { usePremiumScroll } from "../use-premium-scroll";
import type { MotionSafeDivProps } from "./tokens";

export interface ScrollRevealProps extends MotionSafeDivProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className, ...props }: ScrollRevealProps) {
  const { ref, opacity, y } = usePremiumScroll<HTMLDivElement>();

  return (
    <m.div ref={ref} style={{ opacity, y }} className={className} {...props}>
      {children}
    </m.div>
  );
}
