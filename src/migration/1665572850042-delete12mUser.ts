import {MigrationInterface, QueryRunner} from "typeorm";

export class delete12mUser1665572850042 implements MigrationInterface {
    name = 'delete12mUser1665572850042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "userId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
