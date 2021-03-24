import { QueryRunner, Repository } from 'typeorm';

export interface IOrmSeeder<T> {
    seed(data: T[]): Promise<void>;
}

export abstract class OrmSeeder<T, OrmType> implements IOrmSeeder<T> {
    protected abstract repositoryName: string;

    constructor(private queryRunner: QueryRunner) {}

    public async seed(data: T[]) {
        const repo = await this.repo();
        await repo.save(data);
        console.log('Seeded: ' + this.repositoryName + ':', data);
    }

    protected async repo() {
        const connection = await this.queryRunner.connection;
        const repo = connection.getRepository(this.repositoryName) as Repository<OrmType>;
        return repo;
    }
}
