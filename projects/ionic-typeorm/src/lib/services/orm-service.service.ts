import { BaseEntity, FindManyOptions } from 'typeorm';
import { IDBService } from './db-service';
import { OrmDatabaseService } from './orm-database.service';

export abstract class OrmService<T extends BaseEntity> extends OrmDatabaseService implements IDBService<T> {
    protected abstract repositoryName: string;

    public async fetch(id: any): Promise<T | null> {
        try {
            const repo = await this.repo();
            const item = await repo.findOneOrFail(id);
            if (!item) {
                return null;
            }
            return item;
        } catch (e) {
            console.error(JSON.stringify(e));
            return null;
        }
    }

    public async all(options?: FindManyOptions): Promise<T[]> {
        try {
            const repo = await this.repo();
            const ormTasks = await repo.find(options);
            return ormTasks;
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    public async remove(entities: T[]): Promise<void> {
        try {
            const repo = await this.repo();
            await repo.remove(entities);
            return Promise.resolve();
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    public async save(data: any): Promise<void> {
        try {
            const repo = await this.repo();
            await repo.save(data);
            return Promise.resolve();
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    public async repo() {
        return await this.getRepository<T>(this.repositoryName);
    }
}
