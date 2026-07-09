"use client";

/**
 * Directional translate + opacity entrance/exit. Falls back to opacity-only
 * when the user prefers reduced motion (no translate).
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

export interface SlideProps extends MotionSafeDivProps {
  children: ReactNode;
  className?: string;
  /** Which edge the element enters from. Default "up". */
  direction?: Direction;
  /** Px translated from. Defaults to a small, UI-appropriate 24px. */
  distance?: number;
  /** Seconds. Defaults to tokens.duration.base. */
  duration?: number;
  /** Seconds before the transition starts. */
  delay?: number;
}

export function Slide({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = durationTokens.base,
  delay = 0,
  ...props
}: SlideProps) {
  const { reducedMotion } = useMotionPreferences();
  const offset = reducedMotion ? { x: 0, y: 0 } : directionToOffset(direction, distance);

  return (
    <m.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: offset.x, y: offset.y }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}
