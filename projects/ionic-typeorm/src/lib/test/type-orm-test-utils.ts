import { IOrmDatabaseEntity, OrmDatabaseService } from '../services/orm-database.service';
import { getTypeOrmConnection } from '../connection';

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
    constructor(dbName: string, entities: any[], migrations: any[]) {
        const conn = getTypeOrmConnection(dbName, entities, migrations);
        this.databaseService = new OrmDatabaseService(conn);
    }

    /**
     * Closes the database connections
     */
    async openDbConnection() {
        return this.databaseService.connect('browser');
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
                const items = await this.getEntityMockData(entity.name);
                if (items.length > 0) {
                    await this.insertEntityMockData(entity.name, items);
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

    private async getEntityMockData(name: string) {
        let data = [];
        const fixtureFile = `fixtures/${name.toLowerCase()}.json`;
        try {
            data = await this.loadMockData(fixtureFile);
        } catch (e) {
            // If no data, do nothing
        }
        return data;
    }

    private async loadMockData(filename: string): Promise<any> {
        const json = await import('./' + filename);
        return json;
    }
}
