import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldOrderReasonDenied1666513021480 implements MigrationInterface {
    name = 'addFieldOrderReasonDenied1666513021480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "denied_reason" character varying DEFAULT ''
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "denied_reason"
        `);
    }

}
