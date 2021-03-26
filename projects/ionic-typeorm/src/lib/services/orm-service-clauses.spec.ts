import { TestBed, waitForAsync } from '@angular/core/testing';
import { TypeOrmTestUtils } from '../test/type-orm-test-utils';
import { TYPE_ORM_TEST_ENTITIES } from '../test/orm/test-entities';
import { TYPE_ORM_TEST_MIGRATIONS } from '../test/orm/test-migrations';
import { TestItemService } from '../test/orm/test-services';
import { getTypeOrmConnection, TYPE_ORM_CONNECTION } from '../connection';
import { ITypeOrmConnection } from 'dist/ionic-typeorm/lib';
import { castTestItem } from '../test/orm/test-interfaces';

describe('OrmServiceClauses', () => {
    let service: TestItemService;

    let utils: TypeOrmTestUtils;
    let conn: ITypeOrmConnection;

    beforeAll(async () => {
        conn = getTypeOrmConnection('test-app-db', TYPE_ORM_TEST_ENTITIES, TYPE_ORM_TEST_MIGRATIONS);
        utils = new TypeOrmTestUtils(conn, 'orm/fixtures/');
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

    it('should return all items where null clause', async () => {
        const items = await service.allWhere('phoneNumber', 'NULL');
        expect(items.length).toEqual(1);
        const actualItem = castTestItem(items[0]);
        expect(actualItem.name).toEqual('Jack Smith');
    });

    it('should return all items where less than clause', async () => {
        const items = await service.allWhere('age', '<', 30);
        expect(items.length).toEqual(1);
        const actualItem = castTestItem(items[0]);
        expect(actualItem.name).toEqual('James Bond');
    });
});
