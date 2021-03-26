import { BaseEntity, FindManyOptions } from 'typeorm';

/** Supported operators to the allWhere endpoints */
export type IOrmServiceWhereOperators =
    | '<=' /** Less than or equal to */
    | '<' /** Less than */
    | '>' /** More than */
    | '>=' /** More than or equal to */
    | '!' /** Not */
    | '=' /** Equal */
    | 'NULL' /** Null */
    | 'LIKE' /** Like */
    | 'ILIKE' /** Ilike (case insensitive) */
    | 'BETWEEN' /** Between */
    | 'IN' /** In */
    | 'RAW'; /** In */

export interface IDBService<T extends BaseEntity> {
    /** Fetch the entity with id  */
    fetch(id: any): Promise<T | null>;
    /** Fetch all entities  */
    all(options?: FindManyOptions): Promise<T[]>;
    /** Fetch all entities where comparitor matches */
    allWhere(field: keyof T, comparitor: IOrmServiceWhereOperators, params: any): Promise<T[]>;
    /** Remove the list of entities  */
    remove(entities: T[]): Promise<void>;
    /** Save and entity  */
    save(data: T): Promise<void>;
    /** Return a array of string representation of the entities  */
    printTable(): Promise<void>;
}
