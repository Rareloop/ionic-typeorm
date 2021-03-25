import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export class TypeOrmConnectionProvider {
    private conn: Connection | undefined;

    constructor(private dbName: string, private entities: any[], private migrations: any[]) {}

    get connection(): Connection {
        return this.conn as Connection;
    }

    public async connect(type: 'cordova' | 'browser' = 'browser', logging?: string[]) {
        if (this.isConnected()) {
            // console.warn('Already connected to TypeORM Connection');
            return;
        }

        const options = this.dbOptions(type, logging);
        console.log('CONNECTION OPTIONS', options);
        this.conn = await createConnection(options);
        console.log('CONNECTED TO ORM: ', type);
    }

    private dbOptions(type: 'cordova' | 'browser', logging?: string[]): ConnectionOptions {
        let dbOptions: ConnectionOptions;
        if (type === 'cordova') {
            dbOptions = {
                type: 'cordova',
                database: this.dbName,
                location: 'default',
            };
        } else {
            dbOptions = {
                type: 'sqljs',
                location: this.dbName,
                autoSave: true,
            };
        }

        // additional options
        const additional = {
            logging: ['warn', 'error'],
            // synchronize: true,
            entities: this.entities,
            // "migrationsTableName": "custom_migration_table",

            // NOTE: Have to manually add all migrations for cordova atm
            // https://github.com/typeorm/typeorm/issues/2360
            migrations: this.migrations,
            migrationsRun: true,
        };

        if (logging) {
            additional.logging = logging;
        }

        Object.assign(dbOptions, additional);

        return dbOptions;
    }

    private isConnected() {
        return typeof this.conn !== 'undefined';
    }
}
