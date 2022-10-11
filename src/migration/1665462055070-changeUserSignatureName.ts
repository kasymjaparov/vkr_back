import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUserSignatureName1665462055070 implements MigrationInterface {
    name = 'changeUserSignatureName1665462055070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "uuid" TO "signature"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "signature" TO "uuid"
        `);
    }

}
