import { BaseEntity, FindConditions, LessThanOrEqual } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class LessThanOrEqualToQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === '<=';
    }

    public parse(name: keyof T, params?: any): FindConditions<T> {
        const clause: FindConditions<T> = {};
        (clause as any)[name] = LessThanOrEqual(params);
        return clause;
    }
}
