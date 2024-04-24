import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingRoles1713919652090 implements MigrationInterface {
    name = 'CreatingRoles1713919652090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT '["USER"]'`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "role" SET DEFAULT '["ORG"]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "role" SET DEFAULT 'ORG'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}
