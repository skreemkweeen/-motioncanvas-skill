"use client";

/**
 * Opacity-only entrance/exit. The safest default when you're not sure motion
 * is warranted at all — no transform, so it never contributes to layout
 * shift and is unaffected by reduced-motion (there's nothing to reduce).
 *
 * Requires the tree to be wrapped in <MotionProvider> (../motion-provider)
 * since it renders `m.div`.
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { duration as durationTokens, type MotionSafeDivProps } from "./tokens";

export interface FadeProps extends MotionSafeDivProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Defaults to tokens.duration.base. */
  duration?: number;
  /** Seconds before the fade starts. */
  delay?: number;
}

export function Fade({
  children,
  className,
  duration = durationTokens.base,
  delay = 0,
  ...props
}: FadeProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}
