# Ionic Typeorm

## Installation

Follow [install steps](./docs/install.md) for installing `@rareloop/ionic-typeorm`

An example Ionic project can be found [in the example project](../example/README.md)

</br>

## Testing

Follow [unit testing config](./docs/testing.md) for additional changes to allow karma to run unit tests with `typeorm`

</br>

## Usage

The library expects entities and migrations in a specific path:

``` sh
    src/app/database/orm/entities/*.ts
    src/app/database/orm/migrations/*.ts
```

In addition the example project also creates

``` sh
    src/app/database/orm/seeders/*.ts
    src/app/database/orm/services/*.ts
```

### Entities

Entities are just `typeorm` entities with a `CommonEntity` definition one that contains a single auto-id column

``` typescript
import { CommonEntity } from '@rareloop/ionic-typeorm';
import { Entity, Column } from 'typeorm';

@Entity('item')
export class Item extends CommonEntity {
    @Column()
    name!: string;

...
}
```

### Seeders

Seeders wrap a seed function in an Entity type to allow simple seeding of data during migrations

``` typescript
import { Item } from '../entities/item';
import { OrmSeeder } from '@rareloop/ionic-typeorm';

export class ItemSeeder extends OrmSeeder<Item> {
  repositoryName = 'item';
}
```

### Migrations

Migrations are standard `typeorm` definitions but can include seeders.

``` typescript
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ItemSeeder } from '../seeders/item.seeder';

export class AddItemTable1616412863882 implements MigrationInterface {
    name = 'AddItemTable1616412863882';

    public async up(queryRunner: QueryRunner): Promise<void> {
        ...

        await this.seed(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        ...
    }

    private async seed(queryRunner: QueryRunner): Promise<void> {
        new ItemSeeder(queryRunner).seed([
            ...
        ]);
    }
}
```

### Services

Services provide a wrapper to the `typeorm` connection and provide useful operations with type safety.

``` typescript
@Injectable({
    providedIn: 'root',
})
export class ItemService extends OrmService<Item> {
    repositoryName = 'item';

    someMethod() {
        return this.all({
            where: {
                phoneNumber: Not(IsNull()),
                age: MoreThan(30),
            },
            take: 10,
        })
    }

    create(name: string) {
        return this.save({
            name
        })
    }
}
```

``` typescript
export interface IDBService<T extends BaseEntity> {
    /** Fetch the entity with id  */
    fetch(id: any): Promise<T | null>;

    /** Fetch all entities  */
    all(options?: FindManyOptions): Promise<T[]>;

    /** Remove the list of entities  */
    remove(entities: T[]): Promise<void>;

    /** Save and entity  */
    save(data: T): Promise<void>;
}
```

</br>

## Auto-Migrations

Add the following npm scripts to provide migration commands.

``` JSON
    "scripts": {
        "migration:create": "npx ionic-typeorm-create",
        "migration:generate": "npx ionic-typeorm-generate"
    }
```

You must have entities and migrations in the following locations:

``` sh
 src/app/database/orm/entities/*.ts
 src/app/database/orm/migrations/*.ts
```

To create a fresh migration file:

``` sh
npm run migration:create NewEntity
```

Alternatively make modifications to you `Entity` files and the run the following to automatically generate the migration for the delta

``` sh
npm run migration:generate UpdatedTaskEntity
```

### How it works

`migration:generate` uses a local sqlite database file and runs all existing migrations against it. Then it compares this against the latest `Entity` definitions to calculate any schema changes.
