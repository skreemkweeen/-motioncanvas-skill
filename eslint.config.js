import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  // dist-tools/ is generated output from npm run plugins:smoke /
  // validate:registry (a throwaway build), not source code — never lint it.
  { ignores: ["node_modules/**", "dist-tools/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    // Node-executed dev scripts (not shipped, not type-checked as part of
    // the TS program) — declare the Node globals they use instead of
    // pulling in the `globals` package for two identifiers.
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
  },
);
