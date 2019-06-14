# @stencil/eslint-plugin

ESLint rules specific to Stencil JS projects.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@stencil/eslint-plugin`:

```
$ npm install @stencil/eslint-plugin --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-stencil` globally.

**Note:** Assumes you are also using [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint).

## Usage

Add `stencil` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@stencil"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@stencil/no-global-html-attribute-prop-names": "error"
    }
}
```

Or alternatively extend the Stencil recommended ruleset:

```
{
    "extends": [
        "plugin:@stencil/recommended"
    ]
}
```

## Supported Rules

- `no-global-html-attribute-prop-names`

This rule catches Stencil Prop names that share names of [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

## Contributing

When submitting new rules please:
- Describe your new rule in the README.md
- Provide a suite of unit tests for your rule
- Follow ESLint Rule guidelines (the [eslint-rule yeoman generator](https://github.com/eslint/generator-eslint) is good for this)

All contributions welcome.

## Licence 

- [MIT](https://raw.githubusercontent.com/ionic-team/stencil/master/LICENSE)
