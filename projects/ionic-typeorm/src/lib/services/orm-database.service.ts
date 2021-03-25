import { Inject, Injectable } from '@angular/core';
import { TYPE_ORM_CONNECTION, ITypeOrmConnection } from '../connection';
import { Repository } from 'typeorm';

export interface IOrmDatabaseEntity {
    name: string;
    tableName: string;
}

@Injectable()
export class OrmDatabaseService {
    constructor(@Inject(TYPE_ORM_CONNECTION) private orm: ITypeOrmConnection) {}

    public async connect(type: 'cordova' | 'browser') {
        return this.orm.connect(type);
    }

    public async disconnect() {
        const connection = await this.orm.connection;
        if (connection.isConnected) {
            await (await this.orm.connection).close();
        }
    }

    public async entities(): Promise<IOrmDatabaseEntity[]> {
        const conn = await this.orm.connection;
        const entityMetadata = await conn.entityMetadatas;
        return entityMetadata.map((x) => ({ name: x.name, tableName: x.tableName }));
    }

    public async getRepository<T>(repositoryName: string) {
        const connection = await this.orm.connection;
        const repo = connection.getRepository(repositoryName) as Repository<T>;
        return repo;
    }
}
