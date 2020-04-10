# Ei Frontend


## Environment Prepare

Install `node_modules`:

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
yarn dev
```

### Build project & Run in production

```bash
yarn build
yarn start
```

### Check code style

```bash
yarn lint
```

You can also use script to auto fix some lint error:

```bash
yarn lint:fix
```

### Test code

```bash
yarn test
```

## Project Structure

```
config
    |---config.js
    |---defaultSetting.js
    |---plugin.config.js

public

src
    |---components
    |---pages

```


1. `config/config.js`: Basic menu config

