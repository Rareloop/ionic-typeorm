import { ITestItem } from './test-interfaces';

export const expectedAllTestItems: ITestItem[] = [
    {
        id: 1,
        name: 'John Smith',
        phoneNumber: null,
        hasPhoneNumber: false,
    },
    {
        id: 2,
        name: 'Jack MacDonald',
        phoneNumber: '012345678910',
        hasPhoneNumber: true,
    },
    {
        id: 3,
        name: 'James Bond',
        phoneNumber: '007',
        hasPhoneNumber: true,
    },
];
