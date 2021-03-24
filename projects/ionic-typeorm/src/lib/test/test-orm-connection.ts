import { TestBed } from '@angular/core/testing';
import { getTypeOrmConnection, ITypeOrmConnection } from '../connection';

export const getTestOrmConnection = async (
    dbName: string,
    entities: any[],
    migrations: any[]
): Promise<ITypeOrmConnection> => {
    const connection = getTypeOrmConnection(dbName, entities, migrations);
    await connection.connect('browser');
    return connection;
};

export const provideTypeOrmConnection = async <T, R>(
    token: T,
    createRepo: (c: ITypeOrmConnection) => R,
    dbName: string,
    entities: any[],
    migrations: any[]
) => {
    const connection = await getTestOrmConnection(dbName, entities, migrations);
    TestBed.overrideProvider(token, {
        useValue: createRepo(connection),
    });
};
