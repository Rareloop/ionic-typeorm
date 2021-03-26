import { ITestItem } from './test-interfaces';

export const expectedAllTestItems: ITestItem[] = [
    {
        id: 1,
        name: 'Jack Smith',
        age: 34,
        phoneNumber: null,
        hasPhoneNumber: false,
    },
    {
        id: 2,
        name: 'Jack MacDonald',
        age: 51,
        phoneNumber: '012345678910',
        hasPhoneNumber: true,
    },
    {
        id: 3,
        name: 'James Bond',
        age: 25,
        phoneNumber: '007',
        hasPhoneNumber: true,
    },
];
