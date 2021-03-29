# Ionic Typeorm

## Installation

Follow [install steps](./docs/install.md) for installing `@rareloop/ionic-typeorm`

</br>

## Testing

Follow [unit testing config](./docs/testing.md) for additional changes to allow karma to run unit tests with `typeorm`

</br>

## Usage

The following steps outline what is require to use the library. There is also an [example project](../example/README.md) that has already been updated.

### Create Entities Migrations and Services

Follow [entities, migrations and services](./docs/database.md) to create your initial database schema and migrations.

### Integrate with app.module

After you have some migrations and entities you can follow [integrating into app.module.ts](./docs/integration.md) to ensure your database is loaded when the app loads.

### Integrate services with pages

Now you are ready to start using your services. To do this import your services into a page

``` typescript
import { ItemService } from '@orm/services/item.service';

export class HomePage {
    items: Item[] = [];

    constructor(itemService: ItemService) {
        itemService.all().then((items) => {
            this.items = items;
        });

        // Fetch item
        const item: Item = itemService.fetch(1);

        // Save item
        item.name = 'A different name';
        itemService.save(item);

        // Delete item
        itemService.delete([item]);

        // Custom operations
        const repo: Repository<Item> = itemService.repo();
        // Full typeorm functionality e.g. repo.count(...);
    }
}
```

</br>
