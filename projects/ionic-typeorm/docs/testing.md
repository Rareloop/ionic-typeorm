# Ionic Typeorm Testing Configuration

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
