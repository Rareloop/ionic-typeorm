import { BaseEntity, FindConditions, In } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';
import { IQueryClause } from './query-clause';

export class InQueryClause<T extends BaseEntity> implements IQueryClause<T> {
    matches(name: IOrmServiceWhereOperators): boolean {
        return name === 'IN';
    }

    public parse(name: keyof T, ...args: any): FindConditions<T> {
        const clause: FindConditions<T> = {};
        (clause as any)[name] = In(args);
        return clause;
    }
}
