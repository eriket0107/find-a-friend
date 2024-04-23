import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddingOrganization1712979899187 implements MigrationInterface {
  name = 'AddingOrganization1712979899187'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "addressId" uuid, CONSTRAINT "REL_63c0d3f228775d613e037b94e2" UNIQUE ("addressId"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`ALTER TABLE "address" ADD "organizationId" uuid`)
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "UQ_276e71f86f0a44ca7c147407112" UNIQUE ("organizationId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13T03:45:00.049Z'`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_63c0d3f228775d613e037b94e25" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_276e71f86f0a44ca7c147407112" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_276e71f86f0a44ca7c147407112"`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_63c0d3f228775d613e037b94e25"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13'`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "UQ_276e71f86f0a44ca7c147407112"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" DROP COLUMN "organizationId"`,
    )
    await queryRunner.query(`DROP TABLE "organization"`)
  }
}
