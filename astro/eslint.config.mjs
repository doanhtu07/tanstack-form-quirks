import { defineConfig } from "eslint/config"
import globals from "globals"
import js from "@eslint/js"
import tseslint from "typescript-eslint"
import astro from "eslint-plugin-astro"
import prettier from "eslint-plugin-prettier"
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"

// https://cosmicthemes.com/blog/astro-eslint-prettier-setup/

// Parsers
const tsParser = tseslint.parser
const astroParser = astro.parser

export default defineConfig([
  // Global configuration
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Base configs
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // you may want this as it can get annoying
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Prettier config
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      // disable warnings, since prettier should format on save
      "prettier/prettier": "warn",
    },
  },

  // React config
  {
    files: ["**/*.jsx", "**/*.tsx"],
    ...reactPlugin.configs.flat.recommended,
    rules: {
      // import React from "react" is not needed anymore
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    ...reactHooks.configs["recommended-latest"],
  },

  // Astro setup with a11y
  astro.configs.recommended,
  astro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Disable "not defined" errors for specific Astro types that are globally available (ImageMetadata)
      "no-undef": "off",
    },
  },

  // Ignore patterns
  {
    ignores: ["dist/**", "**/*.d.ts"],
  },
])
