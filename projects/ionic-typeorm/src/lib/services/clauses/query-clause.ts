import { BaseEntity, FindManyOptions } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';

export interface IQueryClause<T extends BaseEntity> {
    matches(name: IOrmServiceWhereOperators): boolean;

    parse(field: keyof T, ..._args: any[]): FindManyOptions<T>;
}
