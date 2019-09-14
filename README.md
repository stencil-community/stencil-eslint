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

- [`@stencil/async-methods`](./docs/async-methods.md)

This rule catches Stencil public methods that are not async.

- [`@stencil/ban-prefix`](./docs/ban-prefix.md)

This rule catches Stencil Component banned tag name prefix.

- [`@stencil/decorators-context`](./docs/decorators-context.md)

This rule catches Stencil decorators in bad locations.

- [`@stencil/decorators-style`](./docs/decorators-style.md)

This rule catches Stencil decorators style usage.

- [`@stencil/host-data-deprecated`](./docs/host-data-deprecated.md)

This rule catches Stencil method hostData.

- [`@stencil/methods-must-be-public`](./docs/methods-must-be-public.md)

This rule catches Stencil Methods marked as private or protected.

- [`@stencil/prefer-vdom-listener`](./docs/prefer-vdom-listener.md)

This rule catches Stencil Listen with vdom events.

- [`@stencil/props-must-be-public`](./docs/props-must-be-public.md)

This rule catches Stencil Props marked as private or protected.

- [`@stencil/props-must-be-readonly`](./docs/props-must-be-readonly.md)

This rule catches Stencil Props marked as non readonly, excluding mutable ones.

- [`@stencil/render-returns-host`](./docs/render-returns-host.md)

This rule catches Stencil Render returning array instead of Host tag.

- [`@stencil/required-prefix`](./docs/required-prefix.md)

This rule catches Stencil Component required tag name prefix.

- [`@stencil/reserved-member-names`](./docs/reserved-member-names.md)

This rule catches Stencil Prop names that share names of Global HTML Attributes.

- [`@stencil/single-export`](./docs/single-export.md)

This rule catches modules that expose more than just the Stencil Component itself.

## Recommended rules

```json
{
  "@stencil/async-methods": "error",
  "@stencil/ban-prefix": ["error", ["stencil", "st", "stnl"]],
  "@stencil/decorators-context": "error",
  "@stencil/decorators-style": [
    "error", {
      "prop": "inline",
      "state": "inline",
      "element": "inline",
      "event": "inline",
      "method": "multiline",
      "watch": "multiline",
      "listen": "multiline"
    }],
  "@stencil/host-data-deprecated": "error",
  "@stencil/methods-must-be-public": "error",
  "@stencil/prefer-vdom-listener": "error",
  "@stencil/props-must-be-public": "error",
  "@stencil/props-must-be-readonly": "error",
  "@stencil/render-returns-host": "error",
  "@stencil/reserved-member-names": "error",
  "@stencil/single-export": "error"
}
```

## Contributing

When submitting new rules please:
- Describe your new rule in the README.md
- Provide a suite of unit tests for your rule
- Follow ESLint Rule guidelines (the [eslint-rule yeoman generator](https://github.com/eslint/generator-eslint) is good for this)

All contributions welcome.

## Licence

- [MIT](https://raw.githubusercontent.com/ionic-team/stencil/master/LICENSE)
