import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importX from "eslint-plugin-import-x";

const importOrderRule = [
  "error",
  {
    groups: ["builtin", "external", "internal", "sibling", "parent", "index", "object", "type"],
    pathGroups: [
      {
        pattern: "{react,react-dom,react-redux,@reduxjs/toolkit}",
        group: "external",
        position: "before",
      },
      {
        pattern: "next",
        group: "external",
        position: "before",
      },
      {
        pattern: "next/**",
        group: "external",
        position: "before",
      },
      {
        pattern: "@/constants/**",
        group: "internal",
        position: "before",
      },
      {
        pattern: "@/types/**",
        group: "internal",
        position: "before",
      },
      {
        pattern: "@/lib/**",
        group: "internal",
        position: "before",
      },
      {
        pattern: "@/hooks/**",
        group: "internal",
        position: "before",
      },
      {
        pattern: "@/components/**",
        group: "internal",
        position: "after",
      },
    ],
    pathGroupsExcludedImportTypes: ["react", "type"],
    "newlines-between": "always",
    alphabetize: {
      order: "asc",
      caseInsensitive: true,
    },
    distinctGroup: true,
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    plugins: {
      "import-x": importX,
    },
    rules: {
      "import-x/order": importOrderRule,
      "import-x/no-duplicates": ["error", { "prefer-inline": false }],
      "import-x/newline-after-import": "error",
      "import-x/no-useless-path-segments": ["error", { noUselessIndex: true }],
      "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
    },
  },
]);

export default eslintConfig;
