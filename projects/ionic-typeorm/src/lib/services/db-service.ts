import { BaseEntity } from 'typeorm';

export type IOrmServiceWhereOperators =
    | '<=' // Less than or equal to
    | '<' // Less than
    | '>' // More than
    | '>=' // More than or equal to
    | '!' // Not
    | '=' // Equal
    | 'NULL' // Null
    | 'LIKE' // Like
    | 'ILIKE' // Ilike
    | 'BETWEEN' // Between
    | 'IN' // In
    | 'RAW'; // In

export interface IDBService<T extends BaseEntity> {
    fetch(id: any): Promise<T | null>;
    all(): Promise<T[]>;
    allWhere(field: keyof T, comparitor: IOrmServiceWhereOperators, ...params: any): Promise<T[]>;
    remove(entities: T[]): Promise<void>;
    save(data: T): Promise<void>;
    printTable(): Promise<void>;
}
