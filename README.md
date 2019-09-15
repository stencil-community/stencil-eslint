# @d0whc3r/eslint-plugin-stencil

ESLint rules specific to Stencil JS projects.

## Installation

Install the following deps in your stencil project:

```bash
npm i eslint @typescript-eslint/parser @d0whc3r/eslint-plugin-stencil --save-dev
```

## Usage

`.eslintrc.json` configuration file:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@d0whc3r/stencil/recommended"
  ]
}
```

## Supported Rules

- [`@d0whc3r/stencil/async-methods`](./docs/async-methods.md)

This rule catches Stencil public methods that are not async.

- [`@d0whc3r/stencil/ban-prefix`](./docs/ban-prefix.md)

This rule catches Stencil Component banned tag name prefix.

- [`@d0whc3r/stencil/class-pattern`](./docs/class-pattern.md)

This rule catches Stencil Component class name not matching configurable pattern.

- [`@d0whc3r/stencil/decorators-context`](./docs/decorators-context.md)

This rule catches Stencil decorators in bad locations.

- [`@d0whc3r/stencil/decorators-style`](./docs/decorators-style.md)

This rule catches Stencil decorators style usage.

- [`@d0whc3r/stencil/element-type`](./docs/element-type.md)

This rule catches Stencil Element decorator have the correct type.

- [`@d0whc3r/stencil/host-data-deprecated`](./docs/host-data-deprecated.md)

This rule catches Stencil method hostData.

- [`@d0whc3r/stencil/methods-must-be-public`](./docs/methods-must-be-public.md)

This rule catches Stencil Methods marked as private or protected.

- [`@d0whc3r/stencil/no-unused-watch`](./docs/no-unused-watch.md)

This rule catches Stencil Watchs with non existing Props or States.

- [`@d0whc3r/stencil/prefer-vdom-listener`](./docs/prefer-vdom-listener.md)

This rule catches Stencil Listen with vdom events.

- [`@d0whc3r/stencil/props-must-be-public`](./docs/props-must-be-public.md)

This rule catches Stencil Props marked as private or protected.

- [`@d0whc3r/stencil/props-must-be-readonly`](./docs/props-must-be-readonly.md)

This rule catches Stencil Props marked as non readonly, excluding mutable ones.

- [`@d0whc3r/stencil/render-returns-host`](./docs/render-returns-host.md)

This rule catches Stencil Render returning array instead of Host tag.

- [`@d0whc3r/stencil/required-jsdoc`](./docs/required-jsdoc.md)

This rule catches Stencil Props, Methods and Events to define jsdoc.

- [`@d0whc3r/stencil/required-prefix`](./docs/required-prefix.md)

This rule catches Stencil Component required tag name prefix.

- [`@d0whc3r/stencil/reserved-member-names`](./docs/reserved-member-names.md)

This rule catches Stencil Prop names that share names of Global HTML Attributes.

- [`@d0whc3r/stencil/single-export`](./docs/single-export.md)

This rule catches modules that expose more than just the Stencil Component itself.

## Recommended rules

```json
{
  "@d0whc3r/stencil/async-methods": "error",
  "@d0whc3r/stencil/ban-prefix": ["error", ["stencil", "stnl", "st"]],
  "@d0whc3r/stencil/decorators-context": "error",
  "@d0whc3r/stencil/decorators-style": [
    "error", {
      "prop": "inline",
      "state": "inline",
      "element": "inline",
      "event": "inline",
      "method": "multiline",
      "watch": "multiline",
      "listen": "multiline"
    }],
  "@d0whc3r/stencil/element-type": "error",
  "@d0whc3r/stencil/host-data-deprecated": "error",
  "@d0whc3r/stencil/methods-must-be-public": "error",
  "@d0whc3r/stencil/no-unused-watch": "error",
  "@d0whc3r/stencil/prefer-vdom-listener": "error",
  "@d0whc3r/stencil/props-must-be-public": "error",
  "@d0whc3r/stencil/props-must-be-readonly": "error",
  "@d0whc3r/stencil/render-returns-host": "error",
  "@d0whc3r/stencil/required-jsdoc": "error",
  "@d0whc3r/stencil/reserved-member-names": "error",
  "@d0whc3r/stencil/single-export": "error"
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
