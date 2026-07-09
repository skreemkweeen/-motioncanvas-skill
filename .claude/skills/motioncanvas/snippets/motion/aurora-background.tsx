"use client";

/**
 * Slow-drifting blurred gradient blobs behind hero content (the "aurora" /
 * mesh-gradient background). Deliberately pure CSS `@keyframes`, not Framer
 * Motion — a background decoration that never needs JS involvement, and the
 * `@media (prefers-reduced-motion: reduce)` override works even if this
 * component ends up outside a <MotionProvider> for some reason.
 *
 * Reserve for hero sections; per references/motion-principles.md this kind
 * of continuous background motion costs more than it's worth in dense UI.
 */

import { useId, type HTMLAttributes, type ReactNode } from "react";

export interface AuroraBackgroundProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  children?: ReactNode;
  className?: string;
  /** CSS colors for the three blurred blobs, back to front. */
  colors?: readonly [string, string, string];
  /** Seconds for one drift cycle. */
  duration?: number;
  /**
   * "relative" for standalone use (the component sizes itself around its
   * own children); "absolute" to fill a positioned ancestor — pass
   * `className="inset-0 -z-10"` (or the CSS equivalent) alongside it, the
   * way `examples/ai-saas-landing/hero.tsx` does for a full-bleed hero
   * background. An inline `style` always wins over a `className`, so a
   * `position: absolute` utility class alone has no effect here — that's
   * a real bug this prop fixes, not a stylistic choice.
   */
  position?: "relative" | "absolute";
}

export function AuroraBackground({
  children,
  className,
  colors = ["#8b5cf6", "#3b82f6", "#10b981"],
  duration = 18,
  position = "relative",
  ...props
}: AuroraBackgroundProps) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div className={className} style={{ position, overflow: "hidden" }} {...props}>
      <style>{`
        @keyframes aurora-drift-${id} {
          0%, 100% { transform: translate(-10%, -10%) scale(1); }
          33% { transform: translate(10%, -5%) scale(1.1); }
          66% { transform: translate(-5%, 10%) scale(0.95); }
        }
        .aurora-blob-${id} {
          animation: aurora-drift-${id} ${duration}s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob-${id} { animation: none; }
        }
      `}</style>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-20%",
          pointerEvents: "none",
          filter: "blur(80px)",
          opacity: 0.5,
        }}
      >
        <div
          className={`aurora-blob-${id}`}
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "40%",
            height: "40%",
            borderRadius: "9999px",
            background: colors[0],
          }}
        />
        <div
          className={`aurora-blob-${id}`}
          style={{
            position: "absolute",
            top: "30%",
            right: "10%",
            width: "35%",
            height: "35%",
            borderRadius: "9999px",
            background: colors[1],
            animationDelay: `${duration / 3}s`,
          }}
        />
        <div
          className={`aurora-blob-${id}`}
          style={{
            position: "absolute",
            bottom: "5%",
            left: "30%",
            width: "45%",
            height: "45%",
            borderRadius: "9999px",
            background: colors[2],
            animationDelay: `${duration / 6}s`,
          }}
        />
      </div>
      {children ? <div style={{ position: "relative" }}>{children}</div> : null}
    </div>
  );
}
