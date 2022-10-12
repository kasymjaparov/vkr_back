import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRelationM2mUserOrder1665569614143 implements MigrationInterface {
    name = 'changeRelationM2mUserOrder1665569614143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "design" (
                "id" SERIAL NOT NULL,
                "visualisation_link" character varying NOT NULL,
                "visualisation_desc_client" character varying,
                "description" character varying,
                "approved" boolean DEFAULT false,
                "reason_not_approved" character varying,
                "sampleId" integer,
                CONSTRAINT "PK_e7a44f12414f03b7f38ff26dc8c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sample" (
                "id" SERIAL NOT NULL,
                "visualisation_link" character varying NOT NULL,
                "visualisation_desc_client" character varying,
                "description" character varying,
                "approved" boolean DEFAULT false,
                "reason_not_approved" character varying,
                "orderId" integer,
                CONSTRAINT "PK_1e92238b098b5a4d13f6422cba7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_orders_order" (
                "userId" integer NOT NULL,
                "orderId" integer NOT NULL,
                CONSTRAINT "PK_1582a74e6810598a432b942672f" PRIMARY KEY ("userId", "orderId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2a54ac0cc61dfd2f9b39a56bf7" ON "user_orders_order" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2b579c8f509cab1a3e3b35cece" ON "user_orders_order" ("orderId")
        `);
        await queryRunner.query(`
            ALTER TABLE "design"
            ADD CONSTRAINT "FK_988a1f0ff8c9d5c0a98543d6eed" FOREIGN KEY ("sampleId") REFERENCES "sample"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "sample"
            ADD CONSTRAINT "FK_d062936acd50ecdd95974dd0a11" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_orders_order"
            ADD CONSTRAINT "FK_2a54ac0cc61dfd2f9b39a56bf7d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_orders_order"
            ADD CONSTRAINT "FK_2b579c8f509cab1a3e3b35cece0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_orders_order" DROP CONSTRAINT "FK_2b579c8f509cab1a3e3b35cece0"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_orders_order" DROP CONSTRAINT "FK_2a54ac0cc61dfd2f9b39a56bf7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "sample" DROP CONSTRAINT "FK_d062936acd50ecdd95974dd0a11"
        `);
        await queryRunner.query(`
            ALTER TABLE "design" DROP CONSTRAINT "FK_988a1f0ff8c9d5c0a98543d6eed"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_2b579c8f509cab1a3e3b35cece"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_2a54ac0cc61dfd2f9b39a56bf7"
        `);
        await queryRunner.query(`
            DROP TABLE "user_orders_order"
        `);
        await queryRunner.query(`
            DROP TABLE "sample"
        `);
        await queryRunner.query(`
            DROP TABLE "design"
        `);
    }

}
