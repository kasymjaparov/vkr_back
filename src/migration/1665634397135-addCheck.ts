import {MigrationInterface, QueryRunner} from "typeorm";

export class addCheck1665634397135 implements MigrationInterface {
    name = 'addCheck1665634397135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "check" (
                "id" SERIAL NOT NULL,
                "link" character varying,
                "approved" character varying DEFAULT false,
                "orderId" integer,
                CONSTRAINT "PK_de2f7a277e891b3342c5b0d2710" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "stage" DROP COLUMN "check"
        `);
        await queryRunner.query(`
            ALTER TABLE "stage" DROP COLUMN "paid"
        `);
        await queryRunner.query(`
            ALTER TABLE "check"
            ADD CONSTRAINT "FK_8d48d10035e1dc681f7b43b54df" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "check" DROP CONSTRAINT "FK_8d48d10035e1dc681f7b43b54df"
        `);
        await queryRunner.query(`
            ALTER TABLE "stage"
            ADD "paid" character varying DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "stage"
            ADD "check" character varying
        `);
        await queryRunner.query(`
            DROP TABLE "check"
        `);
    }

}
