# Ionic Typeorm Testing Configuration

## Karma Testing

An issue with `sql.js:1.5.0` means it doesn't work nicely with karma. In order to work around this an older copy of `sql.js` is included instead for unit testing.

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

## Cypress Testing

If you are using Cypress for e2e testing, you can enable coverage in the webpack config.
This relies on `istanbul-instrumenter-loader` as a `dev` dependency.

In `angular.json` this will look like

``` json
{
    "projects": {
        "app": {
            "architect": {
                "build": {
                    "configurations": {
                        "ci": {
                            "customWebpackConfig": {
                                "path": "node_modules/@rareloop/ionic-typeorm/config/webpack.coverage.asm.js"
                            }
                        },
                    }
                },
                "e2e": {
                    "builder": "@briebug/cypress-schematic:cypress",
                    "options": {
                        "devServerTarget": "app:serve:ci",
                        "watch": true,
                        "headless": false
                    }
                },
                "e2e-ci": {
                    "builder": "@briebug/cypress-schematic:cypress",
                    "options": {
                        "browser": "chrome",
                        "devServerTarget": "app:serve:ci",
                        "headless": true,
                        "watch": false
                    }
                }
            }
        }
    }
```
