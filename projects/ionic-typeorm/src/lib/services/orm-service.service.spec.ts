import { TestBed, waitForAsync } from '@angular/core/testing';
import { TypeOrmTestUtils } from '../test/type-orm-test-utils';
import { TYPE_ORM_TEST_ENTITIES } from '../test/orm/test-entities';
import { TYPE_ORM_TEST_MIGRATIONS } from '../test/orm/test-migrations';
import { TestItemService } from '../test/orm/test-services';
import { getTypeOrmConnection, TYPE_ORM_CONNECTION } from '../connection';
import { expectedAllTestItems } from '../test/orm/test-expected-data';
import { ITypeOrmConnection } from 'dist/ionic-typeorm/lib';
import { castTestItem } from '../test/orm/test-interfaces';
import { IsNull, MoreThan, Not } from 'typeorm';
import { SEED_DATA } from '../test/orm/test-seed-data';

describe('OrmService', () => {
    let service: TestItemService;

    let utils: TypeOrmTestUtils;
    let conn: ITypeOrmConnection;

    beforeAll(async () => {
        conn = getTypeOrmConnection('test-app-db', TYPE_ORM_TEST_ENTITIES, TYPE_ORM_TEST_MIGRATIONS);
        utils = new TypeOrmTestUtils(conn, SEED_DATA);
        await utils.openDbConnection(['warn', 'error']); // , 'query', 'schema', 'all']);
    });

    beforeEach(
        waitForAsync(async () => {
            TestBed.configureTestingModule({
                providers: [
                    TestItemService,
                    {
                        provide: TYPE_ORM_CONNECTION,
                        useValue: conn,
                    },
                ],
            });

            await utils.reloadFixtures();

            service = TestBed.inject(TestItemService);
        }),
        10000
    );

    it('should return all items', async () => {
        const items = await service.all();

        expect(items.length).toEqual(expectedAllTestItems.length);
        expectedAllTestItems.forEach((expectedItem, index) => {
            const actualItem = castTestItem(items[index]);
            expectedItem.id = actualItem.id; // Allow for varying auto-increment id
            expect(actualItem).toEqual(expectedItem);
        });
    });

    it('should return all items with options', async () => {
        const items = await service.all({
            order: {
                name: 'DESC',
            },
        });

        expect(items.length).toEqual(expectedAllTestItems.length);
        expect(items.length).toEqual(3);
        expect(items[0].name).toEqual('James Bond');
        expect(items[1].name).toEqual('Jack Smith');
        expect(items[2].name).toEqual('Jack MacDonald');
    });

    it('should return all items with custom options', async () => {
        const items = await service.all({
            where: {
                phoneNumber: Not(IsNull()),
                age: MoreThan(30),
            },
            take: 10,
        });

        expect(items.length).toEqual(1);
        expect(items[0].name).toEqual('Jack MacDonald');
    });

    it('should return item with id', async () => {
        const items = await service.all();
        const item = items[0];

        const numeralFetch = await service.fetch(item.id);
        const stringFetch = await service.fetch('' + item.id);

        expect(numeralFetch).toBeTruthy();
        expect(stringFetch).toBeTruthy();

        expect(numeralFetch).toEqual(item);
        expect(stringFetch).toEqual(item);
    });

    it('should save an item', async () => {
        const items = await service.all();
        const totalItems = items.length;

        await service.save({
            name: 'John Wayne',
            age: 66,
        });

        const updatedItems = await service.all();
        const updatedTotalItems = updatedItems.length;
        const newItem = castTestItem(updatedItems[updatedItems.length - 1]);

        expect(updatedTotalItems).toEqual(totalItems + 1);
        expect(newItem).toEqual({
            id: newItem.id,
            name: 'John Wayne',
            age: 66,
            phoneNumber: null,
            hasPhoneNumber: false,
        });
    });

    it('should remove an item', async () => {
        const items = await service.all();
        const totalItems = items.length;
        const first = items[0];

        await service.remove([first]);

        const updatedItems = await service.all();
        const updatedTotalItems = updatedItems.length;

        expect(updatedTotalItems).toEqual(totalItems - 1);
        expect(updatedItems.find((x) => x.name === first.name)).toEqual(undefined);
    });
});
