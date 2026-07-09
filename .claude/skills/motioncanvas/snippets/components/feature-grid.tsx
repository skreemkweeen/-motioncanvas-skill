/**
 * Generalized from examples/ai-saas-landing/features.tsx's original
 * hardcoded "Everything after the call, handled" copy and 3-item feature
 * list into a real reusable section: any heading/description/features,
 * any column count.
 */
import type { ReactNode } from "react";
import { Reveal } from "../motion/reveal";
import { StaggerContainer, StaggerItem } from "../motion/stagger-container";
import { FeatureCard } from "./feature-card";

export interface FeatureGridItem {
  title: string;
  description: string;
}

export interface FeatureGridProps {
  heading: ReactNode;
  description?: ReactNode;
  features: readonly FeatureGridItem[];
  /** Grid columns at `sm:` and up. Defaults to 3. */
  columns?: 2 | 3 | 4;
  id?: string;
}

const columnsClass: Record<NonNullable<FeatureGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  heading,
  description,
  features,
  columns = 3,
  id,
}: FeatureGridProps) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>
        {description ? (
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        ) : null}
      </Reveal>
      <StaggerContainer className={`mt-12 grid gap-6 ${columnsClass[columns]}`}>
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <FeatureCard title={feature.title} description={feature.description} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
