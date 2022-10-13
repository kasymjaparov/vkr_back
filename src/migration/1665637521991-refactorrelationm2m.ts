import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorrelationm2m1665637521991 implements MigrationInterface {
    name = 'refactorrelationm2m1665637521991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "order_users_user" (
                "orderId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_3284d422ca09ddfe4f918570a2f" PRIMARY KEY ("orderId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8f6618e9ae9f99b5d67b0a7de8" ON "order_users_user" ("orderId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b3cee067e9832cc367b9184eee" ON "order_users_user" ("userId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order_users_user"
            ADD CONSTRAINT "FK_8f6618e9ae9f99b5d67b0a7de81" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_users_user"
            ADD CONSTRAINT "FK_b3cee067e9832cc367b9184eee6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_users_user" DROP CONSTRAINT "FK_b3cee067e9832cc367b9184eee6"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_users_user" DROP CONSTRAINT "FK_8f6618e9ae9f99b5d67b0a7de81"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b3cee067e9832cc367b9184eee"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8f6618e9ae9f99b5d67b0a7de8"
        `);
        await queryRunner.query(`
            DROP TABLE "order_users_user"
        `);
    }

}
