export default {
  extends: [
    "plugin:@stencil/base",
  ],
  rules: {
    '@stencil/strict-boolean-conditions': 2,
    '@stencil/ban-exported-const-enums': 2,
    '@stencil/dependency-suggestions': 1
  }
};
