export default {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          'jsx': true
        }
      },
      rules: {
        '@stencil/async-methods': 2,
        '@stencil/ban-prefix': [2, ['stencil', 'stnl', 'st']],
        '@stencil/decorators-context': 2,
        '@stencil/element-type': 2,
        '@stencil/host-data-deprecated': 2,
        '@stencil/methods-must-be-public': 2,
        '@stencil/no-unused-watch': 2,
        '@stencil/prefer-vdom-listener': 2,
        '@stencil/props-must-be-public': 2,
        '@stencil/render-returns-host': 2,
        '@stencil/reserved-member-names': 2,
        '@stencil/single-export': 2,
      },
      plugins: [
        '@stencil'
      ]
    }
  ]
};
