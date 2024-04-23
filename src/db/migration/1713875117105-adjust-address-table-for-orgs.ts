import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdjustAddressTableForOrgs1713875117105
  implements MigrationInterface
{
  name = 'AdjustAddressTableForOrgs1713875117105'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_63c0d3f228775d613e037b94e25"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_54c170d5fedd92b7265601b1672"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "organization_id" TO "organizationId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" RENAME CONSTRAINT "UQ_54c170d5fedd92b7265601b1672" TO "UQ_276e71f86f0a44ca7c147407112"`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_63c0d3f228775d613e037b94e25" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "organizationId" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "organizationId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_63c0d3f228775d613e037b94e25"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" RENAME CONSTRAINT "UQ_276e71f86f0a44ca7c147407112" TO "UQ_54c170d5fedd92b7265601b1672"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "organizationId" TO "organization_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_54c170d5fedd92b7265601b1672" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_63c0d3f228775d613e037b94e25" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
