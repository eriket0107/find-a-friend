import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatingDocumentId1712980854337 implements MigrationInterface {
  name = 'CreatingDocumentId1712980854337'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "cnpj" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_480aaa8101e24b3d4e4d874e441" UNIQUE ("cnpj")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "cpf" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13T04:00:55.221Z'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13'`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cpf"`)
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_480aaa8101e24b3d4e4d874e441"`,
    )
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "cnpj"`)
  }
}
