# Template Taro TS

Project template for Taro and TS.

## Directory Structure

```
- src
  - api         server api
  - config      public config
  - pages       all pages component
  - styles      public styles
  - utils       public utils
  - pages.json  all pages config
```

## Path alias

Set it in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

> Attention: the path array must be only one.<br/>
> (Because `config/index.js` require this.)
