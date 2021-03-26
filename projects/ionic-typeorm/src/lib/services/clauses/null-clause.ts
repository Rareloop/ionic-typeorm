import { BaseEntity, FindConditions, IsNull } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class NullQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === 'NULL';
    }

    public parse(name: keyof T, ..._args: any): FindConditions<T> {
        const clause: FindConditions<T> = {};
        (clause as any)[name] = IsNull();
        return clause;
    }
}
