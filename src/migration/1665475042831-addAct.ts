import {MigrationInterface, QueryRunner} from "typeorm";

export class addAct1665475042831 implements MigrationInterface {
    name = 'addAct1665475042831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "act" (
                "id" SERIAL NOT NULL,
                "contract" character varying NOT NULL,
                "client" character varying NOT NULL,
                "pm" character varying NOT NULL,
                "builder" character varying NOT NULL,
                CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL NOT NULL,
                "address" character varying NOT NULL,
                "series" character varying NOT NULL,
                "amount_room" integer NOT NULL,
                "type" character varying,
                "contract" character varying,
                "contract_signed" boolean DEFAULT false,
                "paid_check" character varying,
                "paid" boolean NOT NULL DEFAULT false,
                "actId" integer,
                CONSTRAINT "REL_ae5b2d30470c983dbb1affa1f1" UNIQUE ("actId"),
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_ae5b2d30470c983dbb1affa1f12" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_ae5b2d30470c983dbb1affa1f12"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TABLE "act"
        `);
    }

}
