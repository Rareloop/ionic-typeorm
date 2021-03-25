import { BaseEntity, FindManyOptions } from 'typeorm';
import { getWhereClauses } from './clauses';
import { IDBService, IOrmServiceWhereOperators } from './db-service';
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

    public async all(): Promise<T[]> {
        try {
            const repo = await this.repo();
            const ormTasks = await repo.find();
            return ormTasks;
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    public async allWhere(field: keyof T, comparitor: IOrmServiceWhereOperators, ...params: any): Promise<T[]> {
        try {
            const repo = await this.repo();
            const ormTasks = await repo.find(this.parseClause(field, comparitor, params));
            return ormTasks;
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    parseClause(field: keyof T, comparitor: IOrmServiceWhereOperators, ...params: any): FindManyOptions<T> {
        const allClauses = getWhereClauses<T>();
        const matchedClause = allClauses.find((x) => x.matches(comparitor));
        if (!matchedClause) {
            console.error('Did not find where clause for comparitor: ' + comparitor);
            return {};
        }

        return matchedClause.parse(field, params);
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

    public async printTable() {
        const data = await this.all();
        data.sort().forEach((x) => console.log(this.repositoryName + ' :', x));
    }

    public async repo() {
        return await this.getRepository<T>(this.repositoryName);
    }
}
