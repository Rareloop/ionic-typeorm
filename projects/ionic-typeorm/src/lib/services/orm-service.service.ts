import { IDBService } from './db-service';
import { OrmDatabaseService } from './orm-database.service';

export abstract class OrmService<T, OrmType> extends OrmDatabaseService implements IDBService<T> {
    protected abstract repositoryName: string;

    public async repo() {
        return await this.getRepository<OrmType>(this.repositoryName);
    }

    public async save(data: T): Promise<void> {
        try {
            const repo = await this.repo();
            await repo.save(data);
            return Promise.resolve();
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    public async all(): Promise<T[]> {
        try {
            const repo = await this.repo();
            const ormTasks = await repo.find();
            return ormTasks.map((t) => this.mapData(t));
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    public async printTable() {
        const data = await this.all();
        data.sort().forEach((x) => console.log(this.repositoryName + ' :', x));
    }

    protected abstract mapData(data: OrmType): T;
}
