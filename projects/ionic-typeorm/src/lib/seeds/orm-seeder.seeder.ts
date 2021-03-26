import { QueryRunner, Repository } from 'typeorm';

export interface IOrmSeeder {
    seed(data: any[]): Promise<void>;
}

export abstract class OrmSeeder<OrmType> implements IOrmSeeder {
    protected abstract repositoryName: string;

    constructor(private queryRunner: QueryRunner) {}

    public async seed(data: any[]): Promise<void> {
        const repo = await this.repo();
        await repo.save(data);
    }

    protected async repo() {
        const connection = await this.queryRunner.connection;
        const repo = connection.getRepository(this.repositoryName) as Repository<OrmType>;
        return repo;
    }
}
