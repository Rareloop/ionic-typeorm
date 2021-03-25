export type IOrmServiceWhereOperators =
    | '<=' // Less than or equal to
    | '<' // Less than
    | '>' // More than
    | '>=' // More than or equal to
    | '!' // Not
    | '=' // Equal
    | 'LIKE' // Like
    | 'ILIKE' // Ilike
    | 'BETWEEN' // Between
    | 'IN' // In
    | 'RAW'; // In

export interface IDBService<T> {
    fetch(id: any): Promise<T | null>;
    all(): Promise<T[]>;
    allWhere(field: keyof T, comparitor: IOrmServiceWhereOperators, ...params: any): Promise<T[]>;
    remove(id: any): Promise<void>;
    save(data: T): Promise<void>;
    printTable(): Promise<void>;
}
