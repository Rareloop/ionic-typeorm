# Ionic Typeorm Testing Configuration

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
