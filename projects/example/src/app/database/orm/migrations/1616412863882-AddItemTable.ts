import { MigrationInterface, QueryRunner } from 'typeorm';
import { ItemSeeder } from '../seeds/item.seeder';

export class AddItemTable1616412863882 implements MigrationInterface {
    name = 'AddItemTable1616412863882';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "phoneNumber" integer NOT NULL
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
                name: 'Test 1',
                phoneNumber: 12345,
            },
            {
                id: 2,
                name: 'Test 2',
                phoneNumber: 45678,
            },
        ]);
    }
}
