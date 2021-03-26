import { BaseEntity, FindConditions, ILike } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class ILikeQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === 'ILIKE';
    }

    public parse(name: keyof T, ...args: any): FindConditions<T> {
        const clause: FindConditions<T> = {};
        (clause as any)[name] = ILike(args[0]);
        return clause;
    }
}
