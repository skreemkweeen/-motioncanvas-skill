import { SpotlightFollow } from "../../snippets/motion/spotlight-follow";

export interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

/**
 * The reusable pattern for any "N things this product does" grid — composes
 * SpotlightFollow so every card in a grid shares the same hover affordance
 * without repeating the wiring. Copy this file, not the inline markup, when
 * building a similar section elsewhere in the same product.
 */
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
