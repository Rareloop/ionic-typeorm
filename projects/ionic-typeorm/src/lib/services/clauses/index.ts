import { BaseEntity } from 'typeorm';
import { BetweenQueryClause } from './between-clause';
import { EqualQueryClause } from './equal-clause';
import { ILikeQueryClause } from './ilike-clause';
import { InQueryClause } from './in-clause';
import { NullQueryClause } from './null-clause';
import { LessThanQueryClause } from './less-than-clause';
import { LessThanOrEqualToQueryClause } from './less-than-equal-to-clause';
import { LikeQueryClause } from './like-clause';
import { MoreThanQueryClause } from './more-than-clause';
import { MoreThanOrEqualToQueryClause } from './more-than-equal-to-clause';
import { NotQueryClause } from './not-clause';
import { IQueryClause } from './query-clause';
import { RawQueryClause } from './raw-clause';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getWhereClauses<T extends BaseEntity>(): IQueryClause<T>[] {
    return [
        new NullQueryClause<T>(),
        new LessThanQueryClause<T>(),
        new LessThanOrEqualToQueryClause<T>(),
        new MoreThanOrEqualToQueryClause<T>(),
        new MoreThanQueryClause<T>(),
        new NotQueryClause<T>(),
        new EqualQueryClause<T>(),
        new LikeQueryClause<T>(),
        new ILikeQueryClause<T>(),
        new BetweenQueryClause<T>(),
        new InQueryClause<T>(),
        new RawQueryClause<T>(),
    ];
}
