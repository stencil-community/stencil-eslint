export default {
  overrides: [{
    parser: "@typescript-eslint/parser",
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module"
    },
    rules: {
      "@stencil/reserved-member-names": "error",
      "@stencil/single-export": "error"
    },
    plugins: [
      "@typescript-eslint",
      "@stencil"
    ]
  }, ],
};