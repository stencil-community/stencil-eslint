export default {
  overrides: [{
    parser: "@typescript-eslint/parser",
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module"
    },
    rules: {
      "@stencil/no-global-html-attribute-prop-names": "error"
    },
    plugins: [
      "@typescript-eslint",
      "@stencil"
    ]
  }, ],
};