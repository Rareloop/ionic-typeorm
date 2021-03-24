export interface IDBService<T> {
    save(data: T): Promise<void>;
    all(): Promise<T[]>;
    printTable(): Promise<void>;
}
