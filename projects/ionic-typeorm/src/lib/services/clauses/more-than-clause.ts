import { BaseEntity, FindConditions, MoreThan } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class MoreThanQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === '>';
    }

    public parse(name: keyof T, ...args: any): FindConditions<T> {
        const clause: FindConditions<T> = {};
        (clause as any)[name] = MoreThan(args[0]);
        return clause;
    }
}
