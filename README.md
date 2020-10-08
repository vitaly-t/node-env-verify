# node-env-type

Easy detection of NodeJS environment type from `NODE_ENV` variable.

## Installing

```
$ npm i node-env-type
```

## Usage

* In TypeScript:

```ts
import {env} from 'node-env-type';

if(env.isDev) {
 // this is a DEV environment
}
```

* In JavaScript:

```ts
const {env} = require('node-env-type');

if(env.isProd) {
 // this is a PROD environment
}
```

## Environment Flags

Table below explains available flags and when they are set.

| Flag     |      Environment           |  Condition |
|:--------:|:--------------------------:|:-----------|
| `isDev`  | Development                | `NODE-ENV` includes `dev` (case-insensitive) |
| `isUAT`  | User Acceptance Testing    | `NODE-ENV` includes `uat` (case-insensitive) |
| `isSIT`  | System Integration Testing | `NODE-ENV` includes `sit` (case-insensitive) |
| `isCI`   | Continuous Integration     | `NODE-ENV` includes `ci` (case-insensitive)  |
| `isTest` | General Testing            | `NODE-ENV` includes any of: `test`, `tst`, `uat`, `sit`, `ci` (case-insensitive)|
| `isProd` | Production                 | `NODE-ENV` includes `prod` (case-insensitive), or not set at all. |

Flags are tested in the order as shown in the table, to use only the first one found, in case there's a conflict.
 
Two special cases from the above:

* `isTest` - set not only when `NODE_ENV` includes `test` or `tst`, but also when `isUAT`, `isSIT` or `isCI`
  is set, because all those environments are essentially for testing.
* `isProd` - set not only when `NODE_ENV` includes `prod`, but also when `NODE_ENV` is not set at all,
  i.e. when environment is not configured, we should assume it to be production.  

## API

The only API available other than the environment flags is function `refresh`, in case you want
to refresh flags from the environment without restarting the process.

```ts
import {env} from 'node-env-type';

env.refresh(); // refresh status of all flags from the environment
```
