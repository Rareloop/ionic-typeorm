import { InjectionToken } from '@angular/core';
import { Connection } from 'typeorm';

/** Interface for interacting with a TypeORM connection */
export interface ITypeOrmConnection {
    readonly connection: Connection;
    connect(type?: 'cordova' | 'browser'): Promise<void>;
}

/** Injectable token for dependency injection */
export const TYPE_ORM_CONNECTION = new InjectionToken<ITypeOrmConnection>('TYPE_ORM_CONNECTION');
