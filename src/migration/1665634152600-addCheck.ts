import {MigrationInterface, QueryRunner} from "typeorm";

export class addCheck1665634152600 implements MigrationInterface {
    name = 'addCheck1665634152600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "measurement" DROP CONSTRAINT "FK_6488f7a7736963b123d08ab66ac"
        `);
        await queryRunner.query(`
            ALTER TABLE "approval"
                RENAME COLUMN "description" TO "description_client"
        `);
        await queryRunner.query(`
            ALTER TABLE "measurement" DROP COLUMN "client"
        `);
        await queryRunner.query(`
            ALTER TABLE "measurement" DROP COLUMN "measureId"
        `);
        await queryRunner.query(`
            ALTER TABLE "design"
            ADD "description_client" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "status" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "contract" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "contract"
            SET DEFAULT ''
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "contract" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "act"
            ALTER COLUMN "contract"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "design" DROP COLUMN "description_client"
        `);
        await queryRunner.query(`
            ALTER TABLE "measurement"
            ADD "measureId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "measurement"
            ADD "client" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "approval"
                RENAME COLUMN "description_client" TO "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "measurement"
            ADD CONSTRAINT "FK_6488f7a7736963b123d08ab66ac" FOREIGN KEY ("measureId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
