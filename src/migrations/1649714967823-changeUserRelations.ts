import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUserRelations1649714967823 implements MigrationInterface {
    name = 'changeUserRelations1649714967823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" character varying NOT NULL, "gender" character varying NOT NULL, "isDoc" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "schedule" TIMESTAMP NOT NULL, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
