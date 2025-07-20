import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

export default [
  // 基本設定
  {
    ignores: [
      "**/build/**",
      "**/public/build/**",
      "**/.cache/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/*.config.js",
      "**/*.config.ts",
      "**/temp/**",
    ],
  },

  // JavaScript/TypeScript共通設定
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      prettier,
      unicorn,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/internal-regex": "^~/",
    },
    rules: {
      // ESLint基本ルール
      ...js.configs.recommended.rules,

      // TypeScriptルール
      ...typescript.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Reactルール
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/prop-types": "off",

      // React Hooksルール
      ...reactHooks.configs.recommended.rules,

      // アクセシビリティルール
      ...jsxA11y.configs.recommended.rules,

      // importルール
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "never",
          alphabetize: { order: "asc" },
        },
      ],
      "import/no-unresolved": "error",

      // Unicornルール（推奨設定）
      ...unicorn.configs.recommended.rules,
      // Remixとの互換性のため一部ルールを無効化
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-module": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/prefer-top-level-await": "off",

      // Prettier
      "prettier/prettier": "error",
    },
  },

  // テストファイル用の設定
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/test/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      // テストファイルでは一部のルールを緩和
      "@typescript-eslint/no-explicit-any": "off",
      "unicorn/no-null": "off",
    },
  },
];