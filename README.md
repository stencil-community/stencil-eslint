# @stencil-community/eslint-plugin

ESLint rules specific to Stencil JS projects.

## Installation

If you're using npm v7+, you only need to install this package. Its peer dependencies will be automatically installed.
```bash
npm i --save-dev @stencil-community/eslint-plugin
```

If you're using npm v6 or lower, you will need to install this package and its peer dependencies in your stencil project:

```bash
npm i --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react @stencil-community/eslint-plugin typescript
```

## Usage

`.eslintrc.json` configuration file:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@stencil-community/recommended"
  ]
}
```

Add a new `lint` script to the `package.json`:
```json
{
  "scripts": {
    "lint": "eslint src/**/*{.ts,.tsx}"
  }
}
```

By default, ESLint will ignore your `node_modules/` directory. Consider adding a `.eslintignore` file at the root of
your project with any output target directories to avoid false positive errors from ESLint.
```
# place any directories created by the Stencil compilation process here
dist
loader
www
```

Lint all your project:
```
npm run lint
```

## Supported Rules

- [`@stencil-community/async-methods`](./docs/async-methods.md)

This rule catches Stencil public methods that are not async.

- [`@stencil-community/ban-default-true`](./docs/ban-default-true.md)

This rule catches Stencil Props with a default value of `true`.

- [`@stencil-community/ban-prefix`](./docs/ban-prefix.md)

This rule catches Stencil Component banned tag name prefix.

- [`@stencil-community/class-pattern`](./docs/class-pattern.md)

This rule catches Stencil Component class name not matching configurable pattern.

- [`@stencil-community/decorators-context`](./docs/decorators-context.md)

This rule catches Stencil decorators in bad locations.

- [`@stencil-community/decorators-style`](./docs/decorators-style.md)

This rule catches Stencil decorators style usage.

- [`@stencil-community/element-type`](./docs/element-type.md)

This rule catches Stencil Element decorator have the correct type.

- [`@stencil-community/host-data-deprecated`](./docs/host-data-deprecated.md)

This rule catches Stencil method hostData.

- [`@stencil-community/methods-must-be-public`](./docs/methods-must-be-public.md)

This rule catches Stencil Methods marked as private or protected.

- [`@stencil-community/no-unused-watch`](./docs/no-unused-watch.md)

This rule catches Stencil Watchs with non existing Props or States.

- [`@stencil-community/own-methods-must-be-private`](./docs/own-methods-must-be-private.md)

This rule catches own class methods marked as public.

- [`@stencil-community/own-props-must-be-private`](./docs/own-props-must-be-private.md)

This rule catches own class properties marked as public.

- [`@stencil-community/prefer-vdom-listener`](./docs/prefer-vdom-listener.md)

This rule catches Stencil Listen with vdom events.

- [`@stencil-community/props-must-be-public`](./docs/props-must-be-public.md)

This rule catches Stencil Props marked as private or protected.

- [`@stencil-community/props-must-be-readonly`](./docs/props-must-be-readonly.md)

This rule catches Stencil Props marked as non readonly, excluding mutable ones.

- [`@stencil-community/render-returns-host`](./docs/render-returns-host.md)

This rule catches Stencil Render returning array instead of Host tag.

- [`@stencil-community/required-jsdoc`](./docs/required-jsdoc.md)

This rule catches Stencil Props, Methods and Events to define jsdoc.

- [`@stencil-community/required-prefix`](./docs/required-prefix.md)

This rule catches Stencil Component required tag name prefix.

- [`@stencil-community/reserved-member-names`](./docs/reserved-member-names.md)

This rule catches Stencil Prop names that share names of Global HTML Attributes.

- [`@stencil-community/single-export`](./docs/single-export.md)

This rule catches modules that expose more than just the Stencil Component itself.

- [`@stencil-community/strict-mutable`](./docs/strict-mutable.md)

This rule catches Stencil Prop marked as mutable but not changing value in code.

## Recommended rules

```json
{
  "@stencil-community/async-methods": "error",
  "@stencil-community/ban-prefix": ["error", ["stencil", "stnl", "st"]],
  "@stencil-community/decorators-context": "error",
  "@stencil-community/decorators-style": [
    "error", {
      "prop": "inline",
      "state": "inline",
      "element": "inline",
      "event": "inline",
      "method": "multiline",
      "watch": "multiline",
      "listen": "multiline"
    }],
  "@stencil-community/element-type": "error",
  "@stencil-community/host-data-deprecated": "error",
  "@stencil-community/methods-must-be-public": "error",
  "@stencil-community/no-unused-watch": "error",
  "@stencil-community/own-methods-must-be-private": "error",
  "@stencil-community/own-props-must-be-private": "error",
  "@stencil-community/prefer-vdom-listener": "error",
  "@stencil-community/props-must-be-public": "error",
  "@stencil-community/props-must-be-readonly": "error",
  "@stencil-community/render-returns-host": "error",
  "@stencil-community/required-jsdoc": "error",
  "@stencil-community/reserved-member-names": "error",
  "@stencil-community/single-export": "error",
  "@stencil-community/strict-mutable": "error"
}
```

## Contributing

When submitting new rules please:
- Describe your new rule in the README.md
- Provide a suite of unit tests for your rule
- Follow ESLint Rule guidelines (the [eslint-rule yeoman generator](https://github.com/eslint/generator-eslint) is good for this)

All contributions welcome.

## License

- [MIT](https://raw.githubusercontent.com/stencil-community/stencil/main/LICENSE)
