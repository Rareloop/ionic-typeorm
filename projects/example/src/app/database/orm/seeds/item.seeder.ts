import { Item } from '../entities/item';
import { OrmSeeder } from '@rareloop/ionic-typeorm';

export class ItemSeeder extends OrmSeeder<Item> {
    repositoryName = 'item';
}
