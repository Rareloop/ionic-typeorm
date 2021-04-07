# Ionic Typeorm Installation

Install the library and it's dependencies.

``` sh
npm install --save @rareloop/ionic-typeorm
```

``` sh
npm install --save typeorm sql.js
npm install --save-dev @angular-builders/custom-webpack
```

To allow the `typeorm` entity decorations we require an extra compiler option.
Add `"@orm/*": ["src/app/database/orm/*"]` to allow shorter imports in your app.

We also fix a bug where `react-native-sqlite-storage` is not defined by pointing it at a shim.

In `tsconfig.json`:

``` json
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "paths": {
            ...
           "react-native-sqlite-storage": ["node_modules/@rareloop/ionic-typeorm/config/shims/dummy.ts"],
           "@orm/*": ["src/app/database/orm/*"]
        }
    },
```

Update the tsconfig to use `node` types and to include our shim file.

and `tsconfig.app.json`

``` json
{
    "compilerOptions": {
        "types": ["node"],
    },

    "include": [
        ...
        "node_modules/@rareloop/ionic-typeorm/config/shims/dummy.ts"
    ]
}
```

In order to build `typeorm` correctly we require a `custom-webpack` builder so update the `angular.json` to do this.

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

Important: If you are using `@ionic/angular-toolkit@2.3.1` or earlier then it will be using `copy-webpack-plugin@5` which requires a breaking difference within `webpack.wasm.js`. In this case the `production` path should be to:

``` json
    "customWebpackConfig": {
        "path": "node_modules/@rareloop/ionic-typeorm/config/webpack.2.3.1.wasm.js"
    },
```
