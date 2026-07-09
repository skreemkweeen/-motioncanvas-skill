/**
 * Extracted from examples/ai-saas-landing/feature-card.tsx — already fully
 * generic (no product-specific copy), moved here as-is.
 */
import { SpotlightFollow } from "../motion/spotlight-follow";

export interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ title, description, className }: FeatureCardProps) {
  return (
    <SpotlightFollow
      className={`h-full rounded-2xl border border-border bg-card p-6 ${className ?? ""}`}
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </SpotlightFollow>
  );
}
