import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustAddressRelation1713913688197 implements MigrationInterface {
    name = 'AdjustAddressRelation1713913688197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_63c0d3f228775d613e037b94e25"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "REL_63c0d3f228775d613e037b94e2"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "addressId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "REL_63c0d3f228775d613e037b94e2" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_63c0d3f228775d613e037b94e25" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
