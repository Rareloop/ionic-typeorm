import { BaseEntity, FindManyOptions, IsNull } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class IsNullQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === 'NULL';
    }

    public parse(name: keyof T, ..._args: any[]): FindManyOptions<T> {
        const clause: FindManyOptions<T> = {};
        (clause as any)[name] = IsNull();
        return clause;
    }
}
