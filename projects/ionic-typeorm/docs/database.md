# Entities, Migrations and Services

TypeORM uses `Entities` to describe tables and relationships. `Migrations` are used to create the underlying database and seed initial data. `Services` can be create for an `Entity` to provide base get, update and delete operations.

The library expects entities and migrations in a specific path:

``` sh
    src/app/database/orm/entities/*.ts
    src/app/database/orm/migrations/*.ts
```

In addition you can follow the example project standard of having:

``` sh
    src/app/database/orm/seeders/*.ts
    src/app/database/orm/services/*.ts
```

## Entities

Entities are just `typeorm` entities with a `CommonEntity` definition one that contains a single auto-id column.

An example entity could be:

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

## Seeders

A `Seeder` wrap a seed function in an `Entity` type to allow simple seeding of data during migrations. You can extend the `OrmSeeder` to provide type safety for the `seed` interface.

``` typescript
import { Item } from '../entities/item';
import { OrmSeeder } from '@rareloop/ionic-typeorm';

export class ItemSeeder extends OrmSeeder<Item> {
  repositoryName = 'item';
}
```

## Migrations

Migrations are standard `typeorm` definitions but can include seeders.

An example `Migration` that makes use of a `Seeder` would be:

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
            {
                name: 'First item
            },
            ...
        ]);
    }
}
```

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

## Services

Services provide a wrapper to the `typeorm` connection and provide useful operations with type safety. They implement the `IDBService` interface which is implmented by the abstract class `ORMService`.

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

An example service would be:

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
