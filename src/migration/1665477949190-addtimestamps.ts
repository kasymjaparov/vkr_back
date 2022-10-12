import {MigrationInterface, QueryRunner} from "typeorm";

export class addtimestamps1665477949190 implements MigrationInterface {
    name = 'addtimestamps1665477949190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "act"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "act" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "act" DROP COLUMN "created_at"
        `);
    }

}
