# Ionic Typeorm

In `tsconfig.json`:

``` json
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "paths": {
            ...
           "react-native-sqlite-storage": ["node_modules/@rareloop/ionic-typeorm/config/shims/dummy.ts"],
        }
    },
```

and `tsconfig.app.json`

``` json
{
    "compilerOptions": {
        "types": ["node"],
    },

    "include": ["src/**/*.ts", "src/**/*.d.ts", "node_modules/@rareloop/ionic-typeorm/config/shims/dummy.ts"],
}
```

Migration scripts

In `package.json`:

``` json
    "scripts": [
        "migration:create": "npx ionic-typeorm-create",
        "migration:generate": "npx ionic-typeorm-generate"
    ]
```

In `angular.json`

``` json
{
    "projects": {
        "app": {
            "architect": {
                "build": {
                    "builder": "@angular-builders/custom-webpack:browser",
                    "options": {
                        "customWebpackConfig": {
                            "path": "node_modules/@rareloop/ionic-typeorm/config/webpack.asm.js"
                        },
                    },
                    "configurations": {
                        "production": {
                            "customWebpackConfig": {
                                "path": "node_modules/@rareloop/ionic-typeorm/config/webpack.wasm.js"
                            },
                        }
                    }
                },
                "serve": {
                    "builder": "@angular-builders/custom-webpack:dev-server"
                }
            }
        }
    }
```

For unit tests: `karma.conf.js`

``` javascript

module.exports = function (config) {
    config.set({
        files: [
            {
                pattern: 'node_modules/@rareloop/ionic-typeorm/test-lib/sql.js.0.5.0/sql.js',
                included: true,
                watched: false,
            },
        ],
    })
}
```

and `tsconfig.spec.json`

``` json
{
    "compilerOptions": {
        "types": ["jasmine", "node"],
    }
}
```

This `cli` folder allows auto-building migrations

## How to set up

In order to use it add the following to the `package.json` of the project.
You must have entities and migrations in the following locations:

``` sh
 src/app/database/orm/entities/*.ts
 src/app/database/orm/migrations/*.ts
```

``` JSON
    "scripts": {
        "migration:generate": "./node_modules/ionic-typeorm/typeorm/cli/migration-generate.sh",
        "migration:create": "./node_modules/ionic-typeorm/typeorm/cli/migration-create.sh"
    }
```

## How to run

After this just run:
`npm run migration:generate UpdatedTaskEntity` for example and a new migration will be created.
The new migration will contain the delta with the current migrations.

Or run `npm run migration:create NewEntity` and an empty migration will be created.

## How it works

It generates a new sqlite database and runs all existing migrations against it.
Then when running `migration:generate` it compares with this latest database
to auto generated any schema changes.
