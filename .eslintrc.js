/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    project: ["tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "comma-dangle": [
      "warn",
      {
        functions: "never",
        objects: "always-multiline",
        arrays: "always-multiline",
      },
    ],
    quotes: "off",
  },
};
