import { TestItem } from './test-entities';

export interface ITestItem {
    id: number;
    name: string;
    phoneNumber: string | null;
    hasPhoneNumber: boolean;
}

export const castTestItem = (data: TestItem): ITestItem => ({
    id: data.id,
    name: data.name,
    phoneNumber: data.phoneNumber,
    hasPhoneNumber: data.phoneNumber != null,
});
