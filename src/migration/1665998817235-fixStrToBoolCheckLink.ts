import {MigrationInterface, QueryRunner} from "typeorm";

export class fixStrToBoolCheckLink1665998817235 implements MigrationInterface {
    name = 'fixStrToBoolCheckLink1665998817235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "check"
            ALTER COLUMN "link"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "check" DROP COLUMN "approved"
        `);
        await queryRunner.query(`
            ALTER TABLE "check"
            ADD "approved" boolean DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "check" DROP COLUMN "approved"
        `);
        await queryRunner.query(`
            ALTER TABLE "check"
            ADD "approved" character varying DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "check"
            ALTER COLUMN "link" DROP NOT NULL
        `);
    }

}
