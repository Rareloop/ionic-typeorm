import { TypeOrmConnectionProvider } from './type-orm-connection-provider';
import { ITypeOrmConnection, TYPE_ORM_CONNECTION } from './type-orm-connection';

/** Only ever want a single connection so enforce a singleton */
let connection: TypeOrmConnectionProvider | undefined;

/** Singleton retrieval of a connection */
export const getTypeOrmConnection = (dbName: string, entities: any[], migrations: any[]): ITypeOrmConnection => {
    connection = connection ? connection : new TypeOrmConnectionProvider(dbName, entities, migrations);
    return connection;
};

export { TYPE_ORM_CONNECTION, ITypeOrmConnection };
