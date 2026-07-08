/**
 * Data shape for the "project profile" the workflow's repo-intelligence step
 * produces before generating anything beyond a single small component. This
 * is filled in by the agent actually reading the target repo (Glob/Grep/Read
 * — see README.md in this directory for which tool call answers which
 * field). Nothing here scans a filesystem automatically; `summarizeProjectProfile`
 * only renders an already-filled profile into a readable report.
 */

export interface ProjectProfile {
  framework: {
    /** e.g. "Next.js (App Router)", "Vite + React", "Remix". */
    name: string;
    version?: string;
    /** e.g. "app router", "pages router", "react-router". */
    routingStyle?: string;
  };
  styling: {
    /** e.g. "Tailwind CSS", "CSS Modules", "styled-components". */
    system: string;
    tailwindConfigPath?: string;
    /** CSS custom properties / design tokens already defined, e.g. "--color-primary". */
    designTokensFound: readonly string[];
  };
  componentLibrary?: {
    /** e.g. "shadcn/ui", "Radix primitives", "custom". */
    name: string;
    /** e.g. "components/ui/". */
    location: string;
  };
  motion: {
    /** e.g. ["framer-motion"] — read from package.json, not assumed. */
    librariesInstalled: readonly string[];
    existingReducedMotionHandling: boolean;
  };
  typescript: {
    strict: boolean;
    /** e.g. ["@/*"] from tsconfig paths. */
    pathAliases: readonly string[];
  };
  namingConventions: {
    /** e.g. "PascalCase.tsx". */
    componentFiles: string;
    /** e.g. "camelCase useX.ts". */
    hookFiles: string;
  };
  /** Anything else worth flagging — monorepo layout, an unusual structure, etc. */
  notes?: string;
}

export function summarizeProjectProfile(profile: ProjectProfile): string {
  const lines: string[] = [];

  lines.push(
    `Framework: ${profile.framework.name}${
      profile.framework.version ? ` (${profile.framework.version})` : ""
    }`,
  );
  if (profile.framework.routingStyle) {
    lines.push(`Routing: ${profile.framework.routingStyle}`);
  }

  lines.push(`Styling: ${profile.styling.system}`);
  if (profile.styling.tailwindConfigPath) {
    lines.push(`Tailwind config: ${profile.styling.tailwindConfigPath}`);
  }
  if (profile.styling.designTokensFound.length > 0) {
    lines.push(`Existing design tokens: ${profile.styling.designTokensFound.join(", ")}`);
  }

  if (profile.componentLibrary) {
    lines.push(
      `Component library: ${profile.componentLibrary.name} (${profile.componentLibrary.location})`,
    );
  }

  lines.push(
    `Motion libraries installed: ${
      profile.motion.librariesInstalled.length > 0
        ? profile.motion.librariesInstalled.join(", ")
        : "none"
    }`,
  );
  lines.push(
    `Existing reduced-motion handling: ${profile.motion.existingReducedMotionHandling ? "yes" : "no"}`,
  );

  lines.push(`TypeScript strict mode: ${profile.typescript.strict ? "yes" : "no"}`);
  if (profile.typescript.pathAliases.length > 0) {
    lines.push(`Path aliases: ${profile.typescript.pathAliases.join(", ")}`);
  }

  lines.push(
    `Naming conventions: components ${profile.namingConventions.componentFiles}, hooks ${profile.namingConventions.hookFiles}`,
  );

  if (profile.notes) {
    lines.push(`Notes: ${profile.notes}`);
  }

  return lines.join("\n");
}
