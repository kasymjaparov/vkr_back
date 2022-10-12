import {MigrationInterface, QueryRunner} from "typeorm";

export class addcascadedeleteact1665478095246 implements MigrationInterface {
    name = 'addcascadedeleteact1665478095246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_ae5b2d30470c983dbb1affa1f12"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_ae5b2d30470c983dbb1affa1f12" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_ae5b2d30470c983dbb1affa1f12"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_ae5b2d30470c983dbb1affa1f12" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
