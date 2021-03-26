import { BaseEntity, FindConditions, Like } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class LikeQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === 'LIKE';
    }

    public parse(name: keyof T, ...args: any): FindConditions<T> {
        const clause: FindConditions<T> = {};
        (clause as any)[name] = Like(args[0]);
        return clause;
    }
}
