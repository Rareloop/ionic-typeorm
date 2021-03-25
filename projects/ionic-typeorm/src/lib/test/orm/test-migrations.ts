import { MigrationInterface, QueryRunner } from 'typeorm';
import { ItemSeeder } from './test-seeders';

class AddTestItemTable1616412863882 implements MigrationInterface {
    name = 'AddTestItemTable1616412863882';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "phoneNumber" varchar
            )
        `);

        await this.seed(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "item"
        `);
    }

    private async seed(queryRunner: QueryRunner): Promise<void> {
        new ItemSeeder(queryRunner).seed([
            {
                id: 1,
                name: 'Seed 1',
                phoneNumber: '012345',
            },
            {
                id: 2,
                name: 'Seed 2',
                phoneNumber: '45678',
            },
        ]);
    }
}

export const TYPE_ORM_TEST_MIGRATIONS = [AddTestItemTable1616412863882];
