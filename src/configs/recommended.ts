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
        '@d0whc3r/stencil/async-methods': 'error',
        '@d0whc3r/stencil/ban-prefix': ['error', ['stencil', 'stnl', 'st']],
        '@d0whc3r/stencil/decorators-context': 'error',
        '@d0whc3r/stencil/decorators-style': [
          'error', {
            prop: 'inline',
            state: 'inline',
            element: 'inline',
            event: 'inline',
            method: 'multiline',
            watch: 'multiline',
            listen: 'multiline'
          }],
        '@d0whc3r/stencil/element-type': 'error',
        '@d0whc3r/stencil/host-data-deprecated': 'error',
        '@d0whc3r/stencil/methods-must-be-public': 'error',
        '@d0whc3r/stencil/no-unused-watch': 'error',
        '@d0whc3r/stencil/own-props-must-be-private': 'error',
        '@d0whc3r/stencil/prefer-vdom-listener': 'error',
        '@d0whc3r/stencil/props-must-be-public': 'error',
        '@d0whc3r/stencil/props-must-be-readonly': 'error',
        '@d0whc3r/stencil/render-returns-host': 'error',
        '@d0whc3r/stencil/required-jsdoc': 'error',
        '@d0whc3r/stencil/reserved-member-names': 'error',
        '@d0whc3r/stencil/single-export': 'error'
      },
      plugins: [
        '@d0whc3r/stencil'
      ]
    }]
};
