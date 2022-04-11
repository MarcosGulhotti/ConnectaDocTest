import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUserRelations1649715130629 implements MigrationInterface {
    name = 'changeUserRelations1649715130629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca" FOREIGN KEY ("doctorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
    }

}
