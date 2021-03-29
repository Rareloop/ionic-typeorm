# Integrating the library into the app.module

First add an `index.ts` file `src/app/database/orm/` which exports the `Entity` and `Migration` to be used.

An example would be:

``` typescript
import { Item } from './entities/item';
import { AddItemTable1616412863882 } from './migrations/1616412863882-AddItemTable';

export const TYPE_ORM_ENTITIES = [Item];

export const TYPE_ORM_MIGRATIONS = [
    AddItemTable1616412863882,
];

```

With this available import it into `app.module.ts` as well as some library imports.

``` typescript

import { APP_INITIALIZER } from '@angular/core';
import { getTypeOrmConnection, ITypeOrmConnection, TYPE_ORM_CONNECTION } from '@rareloop/ionic-typeorm';

// Local
import { TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS } from '@orm/index';
```

Now you can update your `providers` and add an `APP_INITIALIZER` to ensure the database is connected before loading the rest of your app.

``` typescript
const initApp = (orm: ITypeOrmConnection): (() => Promise<any>) => async () => {
    console.log('initializeApp: connecting to ORM DB');
    await orm.connect('browser');
    console.log('initializeApp: connected to ORM DB');
};

@NgModule({
    ...
    providers: [
        ...
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            multi: true,
            deps: [TYPE_ORM_CONNECTION],
        },
        {
            provide: TYPE_ORM_CONNECTION,
            useValue: getTypeOrmConnection(
                "<database name>",
                TYPE_ORM_ENTITIES,
                TYPE_ORM_MIGRATIONS
            ),
        },
    ]
})
export class AppModule {}
```
