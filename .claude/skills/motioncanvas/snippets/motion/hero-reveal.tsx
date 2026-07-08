"use client";

/**
 * Composed hero entrance: eyebrow, heading, subheading, and actions reveal in
 * sequence rather than all at once. The heading gets the largest distance/
 * duration of the group — per references/motion-principles.md, the most
 * important element on screen should carry the most distinct motion, with
 * everything else quieter so it doesn't compete.
 *
 * Built entirely from StaggerContainer/StaggerItem — no new animation logic.
 * Requires <MotionProvider> ancestor (../motion-provider).
 */

import type { ReactNode } from "react";
import { StaggerContainer, StaggerItem } from "./stagger-container";
import { distance as distanceTokens, duration as durationTokens } from "./tokens";

export interface HeroRevealProps {
  eyebrow?: ReactNode;
  heading: ReactNode;
  subheading?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function HeroReveal({
  eyebrow,
  heading,
  subheading,
  actions,
  className,
}: HeroRevealProps) {
  return (
    <StaggerContainer className={className} amount={0.4}>
      {eyebrow ? <StaggerItem distance={distanceTokens.xs}>{eyebrow}</StaggerItem> : null}
      <StaggerItem distance={distanceTokens.md} duration={durationTokens.slow}>
        {heading}
      </StaggerItem>
      {subheading ? (
        <StaggerItem className="mt-4" distance={distanceTokens.sm}>
          {subheading}
        </StaggerItem>
      ) : null}
      {actions ? (
        <StaggerItem className="mt-8" distance={distanceTokens.sm}>
          {actions}
        </StaggerItem>
      ) : null}
    </StaggerContainer>
  );
}
