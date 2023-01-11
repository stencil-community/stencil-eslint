# ban-prefix

Ensures that a Component's `tag` does not use any of the given prefixes.

## Config

An array of `"string"`s which no Component `tag` will be allowed to use as a prefix.

### Config examples

```json
{ "@stencil-community/ban-prefix": ["error", ["stencil"]] }
```

```json
{ "@stencil-community/ban-prefix": ["error", ["stencil", "st", "stnl"]] }
```

## Schema

```json
{
  "type": "array",
  "items": {
    "type": "string"
  },
  "minLength": 1,
  "additionalProperties": false
}
```
