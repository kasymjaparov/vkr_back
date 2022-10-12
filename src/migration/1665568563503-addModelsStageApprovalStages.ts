import {MigrationInterface, QueryRunner} from "typeorm";

export class addModelsStageApprovalStages1665568563503 implements MigrationInterface {
    name = 'addModelsStageApprovalStages1665568563503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "measurement" (
                "id" SERIAL NOT NULL,
                "link" character varying NOT NULL,
                "client" character varying,
                "come_datetime" character varying DEFAULT '',
                "description" character varying,
                "description_client" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "measureId" integer,
                CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order__image" (
                "id" SERIAL NOT NULL,
                "link" character varying NOT NULL,
                "orderId" integer,
                CONSTRAINT "PK_c6998c62b808a649f5130e8f9ad" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order__room" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "description" character varying,
                "orderId" integer,
                CONSTRAINT "PK_de20d62a4af19931b1008919d36" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "stage__image" (
                "id" SERIAL NOT NULL,
                "link" character varying NOT NULL,
                "stageId" integer,
                CONSTRAINT "PK_25a3abbd7c5896316028afd0f95" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "stage" (
                "id" SERIAL NOT NULL,
                "doc" character varying NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "check" character varying,
                "paid" character varying DEFAULT false,
                "orderId" integer,
                CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "approval" (
                "id" SERIAL NOT NULL,
                "doc" character varying,
                "description" character varying,
                "approved" character varying DEFAULT false,
                "orderId" integer,
                CONSTRAINT "PK_97bfd1cd9dff3c1302229da6b5c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "paid_check"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "paid"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "measurementId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "UQ_46d4693841664574c4f3a73d5d8" UNIQUE ("measurementId")
        `);
        await queryRunner.query(`
            ALTER TABLE "measurement"
            ADD CONSTRAINT "FK_6488f7a7736963b123d08ab66ac" FOREIGN KEY ("measureId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order__image"
            ADD CONSTRAINT "FK_82bead941a2e0ac17b8626926e5" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order__room"
            ADD CONSTRAINT "FK_838064de1d3e0f821811a879bdb" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "stage__image"
            ADD CONSTRAINT "FK_b60ee3d9461bf4c0e2906cc8c11" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "stage"
            ADD CONSTRAINT "FK_c03f75ccfdeb1a8dbb2d88242d4" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_46d4693841664574c4f3a73d5d8" FOREIGN KEY ("measurementId") REFERENCES "measurement"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "approval"
            ADD CONSTRAINT "FK_384ff241f6d4c94e7444f888e31" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "approval" DROP CONSTRAINT "FK_384ff241f6d4c94e7444f888e31"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_46d4693841664574c4f3a73d5d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "stage" DROP CONSTRAINT "FK_c03f75ccfdeb1a8dbb2d88242d4"
        `);
        await queryRunner.query(`
            ALTER TABLE "stage__image" DROP CONSTRAINT "FK_b60ee3d9461bf4c0e2906cc8c11"
        `);
        await queryRunner.query(`
            ALTER TABLE "order__room" DROP CONSTRAINT "FK_838064de1d3e0f821811a879bdb"
        `);
        await queryRunner.query(`
            ALTER TABLE "order__image" DROP CONSTRAINT "FK_82bead941a2e0ac17b8626926e5"
        `);
        await queryRunner.query(`
            ALTER TABLE "measurement" DROP CONSTRAINT "FK_6488f7a7736963b123d08ab66ac"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "UQ_46d4693841664574c4f3a73d5d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "measurementId"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "paid" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "paid_check" character varying
        `);
        await queryRunner.query(`
            DROP TABLE "approval"
        `);
        await queryRunner.query(`
            DROP TABLE "stage"
        `);
        await queryRunner.query(`
            DROP TABLE "stage__image"
        `);
        await queryRunner.query(`
            DROP TABLE "order__room"
        `);
        await queryRunner.query(`
            DROP TABLE "order__image"
        `);
        await queryRunner.query(`
            DROP TABLE "measurement"
        `);
    }

}
