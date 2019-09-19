export default {
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          'jsx': true
        }
      },
      rules: {
        '@stencil/async-methods': 'error',
        '@stencil/ban-prefix': ['error', ['stencil', 'stnl', 'st']],
        '@stencil/decorators-context': 'error',
        '@stencil/decorators-style': [
          'error', {
            prop: 'inline',
            state: 'inline',
            element: 'inline',
            event: 'inline',
            method: 'multiline',
            watch: 'multiline',
            listen: 'multiline'
          }],
        '@stencil/element-type': 'error',
        '@stencil/host-data-deprecated': 'error',
        '@stencil/methods-must-be-public': 'error',
        '@stencil/no-unused-watch': 'error',
        '@stencil/own-methods-must-be-private': 'error',
        '@stencil/own-props-must-be-private': 'error',
        '@stencil/prefer-vdom-listener': 'error',
        '@stencil/props-must-be-public': 'error',
        '@stencil/props-must-be-readonly': 'error',
        '@stencil/render-returns-host': 'error',
        '@stencil/required-jsdoc': 'error',
        '@stencil/reserved-member-names': 'error',
        '@stencil/single-export': 'error',
        '@stencil/strict-mutable': 'error'
      },
      plugins: [
        '@stencil'
      ]
    }]
};
