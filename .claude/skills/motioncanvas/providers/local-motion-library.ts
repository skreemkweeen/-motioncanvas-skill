/**
 * A real, working MotionLibraryProvider cataloging the actual primitives in
 * snippets/motion/ (plus the two pre-existing hooks). `recommend()` is
 * plain keyword overlap against each entry's name/description — no model
 * call, no external service — documented as such in
 * motion-library-provider.ts.
 */

import type {
  MotionLibraryProvider,
  MotionPrimitiveMetadata,
  MotionQuery,
} from "./motion-library-provider";

const catalog: readonly MotionPrimitiveMetadata[] = [
  {
    id: "tokens",
    name: "MotionTokens",
    filePath: "snippets/motion/tokens.ts",
    kind: "tokens",
    description: "Shared duration, ease, spring, distance, and stagger constants.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "fade",
    name: "Fade",
    filePath: "snippets/motion/fade.tsx",
    kind: "component",
    description: "Opacity-only mount/exit transition, the safest default entrance.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "slide",
    name: "Slide",
    filePath: "snippets/motion/slide.tsx",
    kind: "component",
    description: "Directional translate + opacity mount/exit transition.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "reveal",
    name: "Reveal",
    filePath: "snippets/motion/reveal.tsx",
    kind: "component",
    description:
      "Viewport-triggered fade + translate reveal for sections and cards scrolling into view.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "scroll-reveal",
    name: "ScrollReveal",
    filePath: "snippets/motion/scroll-reveal.tsx",
    kind: "component",
    description:
      "Continuous scroll-progress-linked fade and lift, wrapping the usePremiumScroll hook.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "stagger-container",
    name: "StaggerContainer",
    filePath: "snippets/motion/stagger-container.tsx",
    kind: "component",
    description:
      "Parent/child pair (with StaggerItem) for staggered viewport reveals in lists and feature grids.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "hero-reveal",
    name: "HeroReveal",
    filePath: "snippets/motion/hero-reveal.tsx",
    kind: "component",
    description:
      "Composed hero section entrance sequencing eyebrow, heading, subheading, and actions.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "spotlight-follow",
    name: "SpotlightFollow",
    filePath: "snippets/motion/spotlight-follow.tsx",
    kind: "component",
    description:
      "Pointer-following radial highlight overlay for a card, decorative and keyboard-safe.",
    dependencies: [],
    respectsReducedMotion: true,
  },
  {
    id: "animated-border",
    name: "AnimatedBorder",
    filePath: "snippets/motion/animated-border.tsx",
    kind: "component",
    description: "Rotating conic-gradient animated border outline for cards and buttons.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "floating-card",
    name: "FloatingCard",
    filePath: "snippets/motion/floating-card.tsx",
    kind: "component",
    description:
      "Continuous subtle idle float for a hero product shot or single decorative card.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "cursor-glow",
    name: "CursorGlow",
    filePath: "snippets/motion/cursor-glow.tsx",
    kind: "component",
    description: "Soft blurred glow that follows the pointer across a hero or section.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "aurora-background",
    name: "AuroraBackground",
    filePath: "snippets/motion/aurora-background.tsx",
    kind: "component",
    description: "Slow-drifting blurred gradient blobs for a hero background, pure CSS.",
    dependencies: [],
    respectsReducedMotion: true,
  },
  {
    id: "use-magnetic-button",
    name: "useMagneticButton",
    filePath: "snippets/use-magnetic-button.ts",
    kind: "hook",
    description: "Pointer-follow magnetic hover spring for a button, radius-limited.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
  {
    id: "use-premium-scroll",
    name: "usePremiumScroll",
    filePath: "snippets/use-premium-scroll.ts",
    kind: "hook",
    description:
      "Scroll-linked fade and lift hook driving one or more motion values off scroll progress.",
    dependencies: ["framer-motion"],
    respectsReducedMotion: true,
  },
];

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

export function createLocalMotionLibrary(): MotionLibraryProvider {
  return {
    metadata: {
      id: "local-motion-library",
      name: "Local Motion Library",
      version: "1.0.0",
      capabilities: ["search", "recommend"],
    },

    initialize() {
      // Static catalog — no setup needed.
    },

    search(query: MotionQuery) {
      return catalog.filter((entry) => {
        if (query.kind && entry.kind !== query.kind) return false;
        if (query.keyword) {
          const haystack = `${entry.name} ${entry.description}`.toLowerCase();
          if (!haystack.includes(query.keyword.toLowerCase())) return false;
        }
        return true;
      });
    },

    recommend(useCase: string) {
      const queryTokens = new Set(tokenize(useCase));
      if (queryTokens.size === 0) return [];

      const scored = catalog
        .map((entry) => {
          const entryTokens = tokenize(`${entry.name} ${entry.description}`);
          const overlap = entryTokens.filter((token) => queryTokens.has(token)).length;
          return { entry, overlap };
        })
        .filter(({ overlap }) => overlap > 0)
        .sort((a, b) => b.overlap - a.overlap);

      return scored.slice(0, 5).map(({ entry }) => entry);
    },

    dispose() {
      // Nothing to release.
    },
  };
}
