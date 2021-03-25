import { BaseEntity, FindManyOptions } from 'typeorm';

export interface IQueryClause<T extends BaseEntity> {
    matches(name: string): boolean;

    parse(name: keyof T, ..._args: any[]): FindManyOptions<T>;
}
