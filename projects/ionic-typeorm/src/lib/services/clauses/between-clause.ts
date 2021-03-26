import { BaseEntity, Between, FindConditions } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class BetweenQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === 'BETWEEN';
    }

    public parse(name: keyof T, ...args: any): FindConditions<T> {
        const clause: FindConditions<T> = {};
        (clause as any)[name] = Between(args[0], args[1]);
        return clause;
    }
}
