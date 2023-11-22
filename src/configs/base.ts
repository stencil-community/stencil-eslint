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
      env: {
        es2020: true,
        browser: true,
      },
      plugins: [
        '@stencil-community'
      ],
      rules: {
        '@stencil-community/async-methods': 2,
        '@stencil-community/ban-prefix': [2, ['stencil', 'stnl', 'st']],
        '@stencil-community/decorators-context': 2,
        '@stencil-community/element-type': 2,
        '@stencil-community/host-data-deprecated': 2,
        '@stencil-community/methods-must-be-public': 2,
        '@stencil-community/no-unused-watch': 2,
        '@stencil-community/prefer-vdom-listener': 2,
        '@stencil-community/props-must-be-public': 2,
        '@stencil-community/render-returns-host': 2,
        '@stencil-community/reserved-member-names': 2,
        '@stencil-community/single-export': 2,
      }
    }
  ],
  settings: {
    "react": {
      // intentionally fill the version field with an invalid semver string. this appears to remove the error/warning
      // emitted to the console when this key/value pair is not in place, but does not tie us to a version of React,
      // even superficially
      "version": "stencil-maintainers-put-an-invalid-version-intentionally-if-this-errors-please-raise-an-issue-https://github.com/stencil-community/stencil-eslint/issues",
    }
  },
};
