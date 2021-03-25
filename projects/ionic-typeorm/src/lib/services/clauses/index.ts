import { BaseEntity } from 'typeorm';
import { IsNullQueryClause } from './is-null-clause';
import { IQueryClause } from './query-clause';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getWhereClauses<T extends BaseEntity>(): IQueryClause<T>[] {
    return [
        new IsNullQueryClause<T>(), //
        new IsNullQueryClause<T>(),
    ];
}
