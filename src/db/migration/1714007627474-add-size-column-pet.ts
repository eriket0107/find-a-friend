import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSizeColumnPet1714007627474 implements MigrationInterface {
    name = 'AddSizeColumnPet1714007627474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ADD "size" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "size"`);
    }

}
