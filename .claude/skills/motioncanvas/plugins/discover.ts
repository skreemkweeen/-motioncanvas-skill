/**
 * Loads every plugin module in `directory` matching `*.plugin.{ts,js,mjs}`
 * and registers it. This is a Node-side dev-time convenience — it
 * dynamically imports files straight off disk, so it only makes sense
 * running under Node (a build script, a CLI), never inside a browser
 * bundle. It does not transpile anything itself: compiled `.js`/`.mjs`
 * files import directly; `.ts` files need a TS-aware Node runtime (tsx,
 * ts-node) to actually execute this function.
 */

import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { Plugin } from "./types.js";
import type { PluginRegistry } from "./registry.js";

export async function discoverPlugins(
  registry: PluginRegistry,
  directory: string,
): Promise<string[]> {
  let entries: string[];
  try {
    entries = await readdir(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const pluginFiles = entries.filter((entry) => /\.plugin\.(ts|js|mjs)$/.test(entry));
  const registeredIds: string[] = [];

  for (const file of pluginFiles) {
    const fullPath = path.join(directory, file);
    const imported = (await import(pathToFileURL(fullPath).href)) as {
      default?: unknown;
    };
    const plugin = imported.default;

    if (!isPlugin(plugin)) {
      throw new Error(`"${file}" does not default-export a valid Plugin.`);
    }

    registry.register(plugin);
    registeredIds.push(plugin.metadata.id);
  }

  return registeredIds;
}

function isPlugin(value: unknown): value is Plugin {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<Plugin>;
  return (
    typeof candidate.metadata?.id === "string" &&
    Array.isArray(candidate.metadata.capabilities) &&
    typeof candidate.initialize === "function" &&
    typeof candidate.configure === "function" &&
    typeof candidate.execute === "function" &&
    typeof candidate.dispose === "function"
  );
}
