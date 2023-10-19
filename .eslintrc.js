/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
  },
  ignorePatterns: ["node_modules/**"],
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/sort-type-constituents": "warn",
    "no-floating-decimal": "warn",
    "react/no-unescaped-entities": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { disallowTypeAnnotations: false },
    ],
    // Rules below here can be re-enabled when the team wants to address them.
    // When this repo was first monorepo'ed and given tighter checks,
    // there were too many issues to address all at once.
    // They are organized into groups based on what type of warning they are.
    // ---
    // Potential Bugs
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    camelcase: "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "no-await-in-loop": "off",
    "no-param-reassign": "off",
    "no-constant-binary-expression": "off",
    "import/no-cycle": "off",
    "import/order": "off",
    "tsdoc/syntax": "off",
    "react/no-array-index-key": "off",
    "react/no-unstable-nested-components": "off",
    "react/function-component-definition": "off",
    eqeqeq: "off",
    "no-control-regex": "off",
    "no-return-await": "off",
    "@typescript-eslint/require-await": "off",

    // Best practice/readability
    // Some of these might be opinions.
    // You can ignore if you'd like.
    "eslint-comments/no-unlimited-disable": "off",
    "prefer-named-capture-group": "off",
    "prefer-regex-literals": "off",
    "@typescript-eslint/naming-convention": "off",
    "import/no-default-export": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "react/jsx-no-useless-fragment": "off",
    "no-nested-ternary": "off",
    "react/jsx-sort-props": "off",
    "react/hook-use-state": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "func-names": "off",
    "no-console": "off",
    "no-constant-condition": "off",

    // a11y
    "jsx-a11y/html-has-lang": "off",
    "jsx-a11y/no-redundant-roles": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/heading-has-content": "off",
    "react/button-has-type": "off",
  },
};
