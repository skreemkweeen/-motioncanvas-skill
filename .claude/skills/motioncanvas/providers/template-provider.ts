/**
 * Interface only — no implementation ships yet. This repo currently has one
 * reference example (examples/ai-saas-landing/), not a catalog of templates,
 * so wrapping it behind this interface would be a single-entry abstraction
 * with no real caller. Once there are two or three reference examples,
 * promote them into a `local-template-provider.ts` analogous to
 * local-component-registry.ts. Until then, browse examples/ directly.
 */

import type { Provider } from "./types";

export interface TemplateMetadata {
  id: string;
  name: string;
  /** e.g. "landing-page", "dashboard" — deliberately a free string, not a
   * fixed enum: unlike ComponentCategory, the set of template categories is
   * expected to grow ad hoc as reference examples are added. */
  category: string;
  /** Where the example lives, relative to the skill root, e.g. "examples/ai-saas-landing". */
  path: string;
  description: string;
}

export interface TemplateQuery {
  category?: string;
  keyword?: string;
}

export interface TemplateProvider extends Provider<TemplateQuery, TemplateMetadata> {
  /** Returns the reference example's own README content (the full workflow narrative). */
  getReadme(id: string): Promise<string> | string;
}
