import { BaseEntity, FindManyOptions } from 'typeorm';

export interface IDBService<T extends BaseEntity> {
    /** Fetch the entity with id  */
    fetch(id: any): Promise<T | null>;
    /** Fetch all entities  */
    all(options?: FindManyOptions): Promise<T[]>;
    /** Remove the list of entities  */
    remove(entities: T[]): Promise<void>;
    /** Save and entity  */
    save(data: T): Promise<void>;
    /** Return a array of string representation of the entities  */
    printTable(): Promise<void>;
}
