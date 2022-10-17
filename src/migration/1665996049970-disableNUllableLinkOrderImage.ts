import {MigrationInterface, QueryRunner} from "typeorm";

export class disableNUllableLinkOrderImage1665996049970 implements MigrationInterface {
    name = 'disableNUllableLinkOrderImage1665996049970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order__image"
            ALTER COLUMN "link" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order__image"
            ALTER COLUMN "link"
            SET NOT NULL
        `);
    }

}
