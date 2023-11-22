export default {
  plugins: [
    "react"
  ],
  extends: [
    "plugin:@stencil-community/base",
  ],
  rules: {
    '@stencil-community/strict-boolean-conditions': 1,
    '@stencil-community/ban-default-true': 1,
    '@stencil-community/ban-exported-const-enums': 2,
    // '@stencil-community/ban-side-effects': 2,
    '@stencil-community/strict-mutable': 2,
    '@stencil-community/decorators-style': [
      'error', {
        prop: 'inline',
        state: 'inline',
        element: 'inline',
        event: 'inline',
        method: 'multiline',
        watch: 'multiline',
        listen: 'multiline'
      }
    ],
    '@stencil-community/own-methods-must-be-private': 1,
    '@stencil-community/own-props-must-be-private': 1,
    '@stencil-community/dependency-suggestions': 1,
    '@stencil-community/required-jsdoc': 1,
    "react/jsx-no-bind": [1, {
      "ignoreRefs": true
    }]
  }
};
