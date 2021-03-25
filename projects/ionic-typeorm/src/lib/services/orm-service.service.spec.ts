import { waitForAsync } from '@angular/core/testing';
import { Entity, Column, MigrationInterface, QueryRunner } from 'typeorm';
import { CommonEntity } from '../entities/common-entity';
import { TypeOrmTestUtils } from '../test/type-orm-test-utils';
import { OrmSeeder } from '../seeds/orm-seeder.seeder';
import { IDBService } from './db-service';
import { OrmService } from './orm-service.service';

@Entity('item')
export class Item extends CommonEntity {
    @Column()
    name!: string;

    @Column()
    phoneNumber!: number;
}

export interface IItem {
    id: number;
    name: string;
    phoneNumber: number;
}

export class ItemSeeder extends OrmSeeder<IItem, Item> {
    repositoryName = 'item';

    protected data: IItem[] = [];
}

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

        await this.seed(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "item"
        `);
    }

    private async seed(queryRunner: QueryRunner): Promise<void> {
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
}

export const TYPE_ORM_ENTITIES = [Item];

export const TYPE_ORM_MIGRATIONS = [
    AddItemTable1616412863882, // Example
];

export class ItemService extends OrmService<IItem, Item> {
    repositoryName = 'item';

    protected castItem(data: Item): IItem {
        return data;
    }

    protected castKey(name: keyof IItem): keyof Item {
        return name;
    }
}

describe('OrmService', () => {
    let service: IDBService<IItem>;

    let utils: any;

    beforeAll(async () => {
        utils = new TypeOrmTestUtils('test-app-db', TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS);
        await utils.openDbConnection();
    });

    beforeEach(
        waitForAsync(async () => {
            await utils.reloadFixtures();

            service = new ItemService(utils.databaseService.connection);
        }),
        10000
    );

    it('should create 1', async () => {
        const repo = await utils.databaseService.getRepository('item');
        const items = await repo.find();
        console.log(items);

        expect(service).toBeTruthy();
    });

    it('should create 2', () => {
        expect(service).toBeTruthy();
    });

    it('should create 3', () => {
        expect(service).toBeTruthy();
    });

    it('should create 4', () => {
        expect(service).toBeTruthy();
    });
});
