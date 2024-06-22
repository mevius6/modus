// https://eslint.org/docs/latest/use/configure/migration-guide

import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    // extends: ["eslint:recommended", "./custom-config.js"],
    files: ["**/*.js"],
    plugins: {
      // jsdoc: jsdoc
    },
    rules: {
      // "jsdoc/require-description": "error",
    },
    languageOptions: {
      ecmaVersion: "latest", // 2022
      sourceType: "module",
      globals: {
        ...globals.browser,
        // customGlobal: "readonly"
      }
    },
    overrides: [{
      files: ["src/**/*"],
      rules: {
        semi: ["warn", "always"],
        indent: ["error", 2],
        // Handle cases where we are destructuring
        // but may not be using the initial variables
        // https://github.com/carbon-design-system/carbon/blob/main/config/eslint-config-carbon/base.js#L21
        "no-unused-vars": [
          "error",
          {
            "args": "after-used",
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
          }
        ],
        // https://eslint.org/docs/rules/curly
        // "curly": ["error", "multi-or-nest"], // or "multi-line"
        "max-len": [
          "error",
          {
            "ignoreStrings": true,
            "ignoreUrls": true,
            "ignoreTemplateLiterals": true
          }
        ],
        "no-console": "off",
      }
    }]
  }
];
