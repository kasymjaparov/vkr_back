import {MigrationInterface, QueryRunner} from "typeorm";

export class disableNullActMembers1665476707558 implements MigrationInterface {
    name = 'disableNullActMembers1665476707558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "client" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "pm" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "builder" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "builder"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "pm"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "client"
            SET NOT NULL
        `);
    }

}
