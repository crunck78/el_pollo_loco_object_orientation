import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import prettierPlugin from "eslint-plugin-prettier"; // Import the plugin
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    ignores: ["dist/**"]
  },

  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { prettier: prettierPlugin },
    languageOptions: { globals: globals.browser, sourceType: "module" },
    rules: {
      ...js.configs.recommended.rules, // ESLint JS recommended rules
      ...prettierPlugin.configs.recommended.rules // Prettier recommended rules
    }
  },

  // JSON
  {
    files: ["**/*.json"],
    plugins: { json, prettier: prettierPlugin },
    language: "json/json",
    rules: {
      ...json.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules
    }
  },

  // JSONC
  {
    files: ["**/*.jsonc"],
    plugins: { json, prettier: prettierPlugin },
    language: "json/jsonc",
    rules: {
      ...json.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules
    }
  },

  // JSON5
  {
    files: ["**/*.json5"],
    plugins: { json, prettier: prettierPlugin },
    language: "json/json5",
    rules: {
      ...json.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules
    }
  },

  // Markdown
  {
    files: ["**/*.md"],
    plugins: { markdown, prettier: prettierPlugin },
    language: "markdown/commonmark",
    rules: {
      ...markdown.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules
    }
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: { css, prettier: prettierPlugin },
    language: "css/css",
    rules: {
      ...css.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules
    }
  }
]);
