/**
 * Unlike design-inspiration/template/asset providers, a component registry
 * needs no external service — it's bookkeeping over metadata the skill
 * itself produces. See local-component-registry.ts for a real, working
 * in-memory implementation of this interface.
 */

import type { Provider } from "./types.js";

export type ComponentCategory =
  | "button"
  | "card"
  | "form"
  | "modal"
  | "navigation"
  | "hero"
  | "layout"
  | "feedback"
  | "data-display"
  | "other";

export interface RegisteredComponentMetadata {
  id: string;
  name: string;
  category: ComponentCategory;
  /** Where the component lives in the consuming project, e.g. "components/ui/card.tsx". */
  filePath: string;
  variants: readonly string[];
  dependencies: readonly string[];
  animated: boolean;
  themeable: boolean;
  darkModeSupport: boolean;
  respectsReducedMotion: boolean;
  accessibilityNotes?: string;
  /** Short, copy-pasteable usage snippet — how a caller actually renders this component. */
  usageExample?: string;
  /** Anything else worth recording: known limitations, a link to a longer doc, etc. */
  documentationNotes?: string;
}

export interface ComponentQuery {
  category?: ComponentCategory;
  keyword?: string;
}

export interface ComponentRegistryProvider extends Provider<
  ComponentQuery,
  RegisteredComponentMetadata
> {
  register(metadata: RegisteredComponentMetadata): void;
  get(id: string): RegisteredComponentMetadata | undefined;
}
