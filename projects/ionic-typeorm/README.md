# Ionic Typeorm

In `tsconfig.json`:

``` json
    "compilerOptions": {
        "paths": {
            ...
            "react-native-sqlite-storage": ["config/shims/dummy.ts"],
        }
    },
```

Migration scripts

In `package.json`:

``` json
    "scripts": [
        "migration:create": "npx ionic-typeorm-create",
        "migration:generate": "npx ionic-typeorm-generate"
    ]
```
