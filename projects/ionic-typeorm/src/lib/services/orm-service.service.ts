import { BaseEntity, FindManyOptions } from 'typeorm';
import { getWhereClauses } from './clauses';
import { IDBService, IOrmServiceWhereOperators } from './db-service';
import { OrmDatabaseService } from './orm-database.service';

export abstract class OrmService<T, OrmType extends BaseEntity> extends OrmDatabaseService implements IDBService<T> {
    protected abstract repositoryName: string;

    public async fetch(id: any): Promise<T | null> {
        try {
            const repo = await this.repo();
            const item = await repo.findOneOrFail(id);
            if (!item) {
                return null;
            }
            return this.castItem(item);
        } catch (e) {
            console.error(JSON.stringify(e));
            return null;
        }
    }

    public async all(): Promise<T[]> {
        try {
            const repo = await this.repo();
            const ormTasks = await repo.find();
            return ormTasks.map((t) => this.castItem(t));
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    public async allWhere(field: keyof T, comparitor: IOrmServiceWhereOperators, ...params: any): Promise<T[]> {
        try {
            const repo = await this.repo();
            const ormTasks = await repo.find(this.parseClause(field, comparitor, params));
            return ormTasks.map((t) => this.castItem(t));
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    parseClause(field: keyof T, comparitor: IOrmServiceWhereOperators, ...params: any): FindManyOptions<OrmType> {
        const allClauses = getWhereClauses<OrmType>();
        const matchedClause = allClauses.find((x) => x.matches(comparitor));
        if (!matchedClause) {
            console.error('Did not find where clause for comparitor: ' + comparitor);
            return {};
        }
        const key = this.castKey(field);
        return matchedClause.parse(key, params);
    }

    public async remove(id: any): Promise<void> {
        try {
            const repo = await this.repo();
            await repo.remove(id);
            return Promise.resolve();
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject(e);
        }
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

    public async printTable() {
        const data = await this.all();
        data.sort().forEach((x) => console.log(this.repositoryName + ' :', x));
    }

    public async repo() {
        return await this.getRepository<OrmType>(this.repositoryName);
    }

    protected abstract castItem(data: OrmType): T;

    protected abstract castKey(name: keyof T): keyof OrmType;
}
