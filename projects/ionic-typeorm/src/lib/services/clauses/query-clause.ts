import { BaseEntity, FindConditions } from 'typeorm';
import { IOrmServiceWhereOperators } from '../db-service';

export interface IQueryClause<T extends BaseEntity> {
    /** Whether operator matches this clause */
    matches(name: IOrmServiceWhereOperators): boolean;

    /** How to parse the query clause data into an TypeOrm find options object */
    parse(field: keyof T, params?: any): FindConditions<T>;
}
