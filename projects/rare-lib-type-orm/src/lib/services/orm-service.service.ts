import { Inject } from '@angular/core';
import { ITypeOrmConnection, TYPE_ORM_CONNECTION } from '../connection';
import { Repository } from 'typeorm';
import { IDBService } from './db-service';

export abstract class OrmService<T, OrmType> implements IDBService<T> {
    protected abstract repositoryName: string;

    constructor(@Inject(TYPE_ORM_CONNECTION) private orm: ITypeOrmConnection) {}

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

    protected async repo() {
        const connection = await this.orm.connection;
        const repo = connection.getRepository(this.repositoryName) as Repository<OrmType>;
        return repo;
    }

    protected abstract mapData(data: OrmType): T;
}
