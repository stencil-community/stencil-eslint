# @stencil/eslint-plugin

ESLint rules specific to Stencil JS projects.

## Installation

Install the following deps in your stencil project:

```bash
npm i eslint @typescript-eslint/parser @stencil/eslint-plugin --save-dev
```


## Usage

Add `stencil` to the plugins section of your `.eslintrc.json` configuration file:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@stencil/recommended"
  ]
}
```

## Supported Rules

- `@stencil/reserved-member-names`

This rule catches Stencil Prop names that share names of Global HTML Attributes.

- `@stencil/async-methods`

This rule catches Stencil public methods that are not async.

- `@stencil/methods-must-be-public`

This rule catches Stencil Methods marked as private or protected.

- `@stencil/props-must-be-public`

This rule catches Stencil Props marked as private or protected.

- `@stencil/single-export`

This rule catches modules that expose more than just the Stencil Component itself.

## Contributing

When submitting new rules please:
- Describe your new rule in the README.md
- Provide a suite of unit tests for your rule
- Follow ESLint Rule guidelines (the [eslint-rule yeoman generator](https://github.com/eslint/generator-eslint) is good for this)

All contributions welcome.

## Licence

- [MIT](https://raw.githubusercontent.com/ionic-team/stencil/master/LICENSE)
