# Rareloop Lib TypeORM Database

This library contains the TypeORM integration to be used in our Ionic projects.

To use the libraries add the following to an app's `package.json`:
The `<token>` can be found in 1Password for `rare-lib-type-orm`.

```json
{
    ...
    "dependencies": {
        "rare-lib-type-orm": "git+https://read-repository:<token>@gitlab.rareloop.com/ionic-libraries/rare-lib-type-orm.git#master",
    }
}
```

To update the dependency you can run `npm update rare-lib-type-orm`

## Library Dependencies

</br>

>``` bash
>npm install --save "typeorm"
>npm install --save "sql.js"
>```

</br>

### Usage

Create a `src/app/database/orm` folder with the following contents

`entities/item.ts`

``` typescript
import { CommonEntity } from 'rare-lib-type-orm';
import { Entity, Column } from 'typeorm';

@Entity('item')
export class Item extends CommonEntity {
    @Column()
    name!: string;

    @Column()
    phoneNumber!: number;
}
```

`seeders/item.seeder.ts`

``` typescript
import { IItem } from '../../../model/item';
import { Item } from '../entities/item';
import { OrmSeeder } from 'rare-lib-type-orm';

export class ItemSeeder extends OrmSeeder<IItem, Item> {
    repositoryName = 'item';

    protected data: IItem[] = [];
}
```

`services/item.service.ts`

``` typescript
import { Injectable } from '@angular/core';
import { IItem } from '../../../model/item';
import { Item } from '../entities/item';
import { OrmService } from 'rare-lib-type-orm';

@Injectable({
    providedIn: 'root',
})
export class ItemService extends OrmService<IItem, Item> {
    repositoryName = 'item';

    protected mapData(data: Item): IItem {
        return data;
    }
}
```

You can now create a migration based on your entities by adding the following to your npm scripts:

``` json
"migration:generate": "./node_modules/rare-lib-type-orm/typeorm/cli/migration-generate.sh",
        "migration:create": "./node_modules/rare-lib-type-orm/typeorm/cli/migration-create.sh"
```

Then run `npm run migration:generate` to produce a migration file within `src/app/database/orm/migrations` e.g. `AddItemTable1616412863882`. You can modify this to have seeded info like

``` typescript
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ItemSeeder } from '../seeds/item.seeder';

export class AddItemTable1616412863882 implements MigrationInterface {
    name = 'AddItemTable1616412863882';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "phoneNumber" integer NOT NULL
            )
        `);

        new ItemSeeder(queryRunner).seed([
            {
                id: 1,
                name: 'Test 1',
                phoneNumber: 12345,
            },
            {
                id: 2,
                name: 'Test 2',
                phoneNumber: 45678,
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "item"
        `);
    }
}
```

Then export the required information in `src/app/database/orm/index.ts`

``` typescript
import { Item } from './entities/item';
import { AddItemTable1616412863882 } from './migrations/1616412863882-AddItemTable';

export const TYPE_ORM_ENTITIES = [Item];

export const TYPE_ORM_MIGRATIONS = [
    AddItemTable1616412863882, // Example
];
```

The update you `app.module` to use them

``` typescript

import { TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS } from './database/orm';
import { getTypeOrmConnection, ITypeOrmConnection, TYPE_ORM_CONNECTION } from 'rare-lib-type-orm';

const initApp = (
    orm: ITypeOrmConnection
): (() => Promise<any>) => async () => {
    console.log('initializeApp: connecting to ORM DB');
    await orm.connect(environment.mockDB ? 'browser' : 'cordova');
    console.log('initializeApp: connected to ORM DB');
};

    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            multi: true,
            deps: [
                TYPE_ORM_CONNECTION
            ],
        },
        {
            provide: TYPE_ORM_CONNECTION,
            useValue: getTypeOrmConnection(environment.dbName, TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS),
        }
    ],
```
