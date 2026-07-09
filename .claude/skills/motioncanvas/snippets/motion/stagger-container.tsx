"use client";

/**
 * Parent/child pair for staggered viewport reveals (lists, grids, feature
 * cards). `StaggerItem` deliberately has no `initial`/`animate`/`whileInView`
 * of its own — Framer Motion propagates variant state down from the nearest
 * ancestor motion component, which is what produces the staggered timing.
 * Mixing `StaggerItem` with a manually-animated child breaks that
 * propagation, so don't nest an unrelated `m.div` with its own `animate`
 * between container and item.
 *
 * Requires <MotionProvider> ancestor (../motion-provider).
 *
 * `StaggerItem` is marked `data-motion-reveal` so it degrades to visible
 * instead of stuck hidden when JavaScript never runs — see `./no-js.css`.
 * `StaggerContainer` itself needs no marker: its own "hidden" variant is an
 * empty object (only `StaggerItem`'s variant carries the actual opacity/
 * offset), so the container never renders a hidden inline style of its own.
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useMotionPreferences } from "../motion-provider";
import {
  directionToOffset,
  duration as durationTokens,
  stagger as staggerTokens,
  distance as distanceTokens,
  type Direction,
  type MotionSafeDivProps,
} from "./tokens";

export interface StaggerContainerProps extends MotionSafeDivProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's animation start. Defaults to tokens.stagger.base. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className,
  stagger = staggerTokens.base,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  ...props
}: StaggerContainerProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}

export interface StaggerItemProps extends MotionSafeDivProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = distanceTokens.sm,
  duration = durationTokens.base,
  ...props
}: StaggerItemProps) {
  const { reducedMotion } = useMotionPreferences();
  const offset = reducedMotion ? { x: 0, y: 0 } : directionToOffset(direction, distance);

  return (
    <m.div
      data-motion-reveal
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease: "easeOut" },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}
