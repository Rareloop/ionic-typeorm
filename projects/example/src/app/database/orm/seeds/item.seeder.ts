import { IItem } from '../../../model/item';
import { Item } from '../entities/item';
import { OrmSeeder } from '@rareloop/ionic-typeorm';

export class ItemSeeder extends OrmSeeder<IItem, Item> {
    repositoryName = 'item';

    protected data: IItem[] = [];
}
