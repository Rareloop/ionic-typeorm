# Ionic Typeorm Installation

``` sh
npm install --save @rareloop/ionic-typeorm
```

Install peer dependencies

``` sh
npm install --save typeorm sql.js
npm install --save-dev @angular-builders/custom-webpack
```

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

    "include": [
        ...
        "src/**/*.ts",
        "node_modules/@rareloop/ionic-typeorm/config/shims/dummy.ts"
    ],
    "exclude": [
        ...
        "src/**/*.spec.ts"
    ]
}
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

Add the following scripts for use for migrations

``` JSON
    "scripts": {
        "migration:create": "npx ionic-typeorm-create",
        "migration:generate": "npx ionic-typeorm-generate"
    }
```
