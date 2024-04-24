import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustEntities1713917729878 implements MigrationInterface {
    name = 'AdjustEntities1713917729878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_276e71f86f0a44ca7c147407112"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_276e71f86f0a44ca7c147407112"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "UQ_63c0d3f228775d613e037b94e25" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_63c0d3f228775d613e037b94e25" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_63c0d3f228775d613e037b94e25"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "UQ_63c0d3f228775d613e037b94e25"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_276e71f86f0a44ca7c147407112" UNIQUE ("organizationId")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_276e71f86f0a44ca7c147407112" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
