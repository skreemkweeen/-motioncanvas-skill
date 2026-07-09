"use client";

/**
 * Rotating conic-gradient border (the "animated gradient outline" card/button
 * treatment). Implemented as a CSS custom property (`--angle`) driven by
 * Framer Motion's useAnimationFrame, rather than animating a React-managed
 * style prop every frame — avoids a re-render per frame.
 *
 * Reduced motion: the loop still ticks (an empty callback per frame is
 * negligible), but never calls `.set()`, so `--angle` is never written and
 * the gradient falls back to its static CSS default — a border, just not a
 * spinning one.
 *
 * Requires <MotionProvider> ancestor (../motion-provider) — not because it
 * renders `m.*` (it doesn't), but to share the one reduced-motion source of
 * truth with the rest of the library.
 */

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { useAnimationFrame, useMotionValue } from "framer-motion";
import { useMotionPreferences } from "../motion-provider";

export interface AnimatedBorderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  children: ReactNode;
  className?: string;
  /** Border thickness in px. */
  borderWidth?: number;
  /** Seconds per full rotation. */
  duration?: number;
  /** Comma-separated CSS color stops for the conic gradient. */
  colors?: string;
  /** Background of the inner content area — should match the surface it sits on. */
  background?: string;
  borderRadius?: number | string;
}

export function AnimatedBorder({
  children,
  className,
  borderWidth = 1,
  duration = 6,
  colors = "#a78bfa, #60a5fa, #34d399, #a78bfa",
  background = "var(--background, #0a0a0a)",
  borderRadius = 12,
  ...props
}: AnimatedBorderProps) {
  const { reducedMotion } = useMotionPreferences();
  const angle = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    angle.set((angle.get() + (delta / 1000) * (360 / duration)) % 360);
  });

  useEffect(() => {
    return angle.on("change", (latest) => {
      ref.current?.style.setProperty("--angle", `${latest}deg`);
    });
  }, [angle]);

  const radius = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        padding: borderWidth,
        borderRadius: radius,
        background: `conic-gradient(from var(--angle, 135deg), ${colors})`,
      }}
      {...props}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          background,
          borderRadius: `calc(${radius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
