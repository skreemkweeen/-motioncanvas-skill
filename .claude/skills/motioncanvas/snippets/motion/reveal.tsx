"use client";

/**
 * Viewport-triggered fade + translate — the general-purpose "reveal as it
 * scrolls into view" building block for sections, cards, and copy. Unlike
 * Slide/Fade (which animate on mount), Reveal animates when the element
 * enters the viewport, once, by default.
 *
 * Requires <MotionProvider> ancestor (../motion-provider).
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useMotionPreferences } from "../motion-provider";
import {
  directionToOffset,
  duration as durationTokens,
  type Direction,
  type MotionSafeDivProps,
} from "./tokens";

export interface RevealProps extends MotionSafeDivProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  /** Only animate the first time it enters the viewport. Default true. */
  once?: boolean;
  /** Fraction of the element that must be visible to trigger. Default 0.2. */
  amount?: number;
}

export function Reveal({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = durationTokens.slow,
  delay = 0,
  once = true,
  amount = 0.2,
  ...props
}: RevealProps) {
  const { reducedMotion } = useMotionPreferences();
  const offset = reducedMotion ? { x: 0, y: 0 } : directionToOffset(direction, distance);

  return (
    <m.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}
