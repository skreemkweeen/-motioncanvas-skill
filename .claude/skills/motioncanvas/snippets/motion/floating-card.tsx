"use client";

/**
 * Subtle, continuous idle float — for a hero product shot or a single
 * decorative card, not for dense UI. Per references/motion-principles.md
 * ("when not to animate"), looping motion in a dashboard/list reads as
 * flickery rather than premium; reserve this for hero/marketing moments.
 *
 * Renders a plain div (no animation) when reduced motion is preferred.
 * Requires <MotionProvider> ancestor (../motion-provider).
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useMotionPreferences } from "../motion-provider";
import type { MotionSafeDivProps } from "./tokens";

export interface FloatingCardProps extends MotionSafeDivProps {
  children: ReactNode;
  className?: string;
  /** Px of vertical travel (peak-to-peak is 2x this). */
  distance?: number;
  /** Seconds for one up/down cycle. */
  duration?: number;
  /** Phase offset so multiple floating cards don't move in lockstep. */
  delay?: number;
}

export function FloatingCard({
  children,
  className,
  distance = 10,
  duration = 3,
  delay = 0,
  ...props
}: FloatingCardProps) {
  const { reducedMotion } = useMotionPreferences();

  if (reducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}
