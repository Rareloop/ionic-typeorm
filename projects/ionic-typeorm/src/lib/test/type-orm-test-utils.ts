import { ITypeOrmConnection } from '../connection';
import { IOrmDatabaseEntity, OrmDatabaseService } from '../services';

/**
 * This class is used to support TypeORM database testing
 *
 * This class is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
 */
export class TypeOrmTestUtils {
    databaseService: OrmDatabaseService;

    /**
     * Creates an instance of TestUtils
     */
    constructor(conn: ITypeOrmConnection, private fixtureData: { [key: string]: { items: any[] } }) {
        this.databaseService = new OrmDatabaseService(conn);
    }

    /**
     * Closes the database connections
     */
    async openDbConnection(logging?: string[]) {
        return this.databaseService.connect('browser', logging);
    }

    /**
     * Closes the database connections
     */
    async closeDbConnection() {
        return this.databaseService.disconnect();
    }

    /**
     * Returns the entites of the database
     */
    async getEntities() {
        return this.databaseService.entities();
    }

    /**
     * Cleans the database and reloads the entries
     */
    async reloadFixtures() {
        const entities = await this.getEntities();
        await this.cleanAll(entities);
        await this.loadAll(entities);
    }

    /**
     * Cleans all the entities
     */
    async cleanAll(entities: IOrmDatabaseEntity[]) {
        try {
            for (const entity of entities) {
                const repository = await this.databaseService.getRepository(entity.name);
                await repository.query(`DELETE FROM ${entity.tableName};`);
            }
        } catch (error) {
            throw new Error(`ERROR: Cleaning test db: ${error}`);
        }
    }

    /**
     * Insert the data from the src/test/fixtures folder
     */
    async loadAll(entities: IOrmDatabaseEntity[]) {
        try {
            for (const entity of entities) {
                const data = await this.getEntityMockData(entity.name);
                if (data.items && data.items.length > 0) {
                    // eslint-disable-next-line @typescript-eslint/prefer-for-of
                    for (let i = 0; i < data.items.length; i++) {
                        const item = data.items[i];
                        await this.insertEntityMockData(entity.name, item);
                    }
                }
            }
        } catch (error) {
            throw new Error(`ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`);
        }
    }

    private async insertEntityMockData(name: string, items: any[]) {
        const repo = await this.databaseService.getRepository(name);
        return repo.createQueryBuilder(name).insert().values(items).execute();
    }

    private async getEntityMockData(name: string): Promise<{ items: any[] }> {
        let data: { items: any[] } = { items: [] };
        try {
            data = this.fixtureData[name.toLowerCase()];
        } catch (e) {
            console.warn('Fixture not loaded: ' + name.toLowerCase());
            // If no data, do nothing
        }
        return data;
    }
}
