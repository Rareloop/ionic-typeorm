import { OrmSeeder } from '../../seeds/orm-seeder.seeder';
import { TestItem } from './test-entities';

export class ItemSeeder extends OrmSeeder<TestItem> {
    repositoryName = 'item';
}
