import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddingDefaultDateCols1712981147897 implements MigrationInterface {
  name = 'AddingDefaultDateCols1712981147897'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pet" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "pet" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_480aaa8101e24b3d4e4d874e441"`,
    )
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "cnpj"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "cnpj" character varying(14) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_480aaa8101e24b3d4e4d874e441" UNIQUE ("cnpj")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cpf"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "cpf" character varying(11) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13T04:05:48.771Z'`,
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
      `ALTER TABLE "user" ADD "cpf" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf")`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_480aaa8101e24b3d4e4d874e441"`,
    )
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "cnpj"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "cnpj" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_480aaa8101e24b3d4e4d874e441" UNIQUE ("cnpj")`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "organization" DROP COLUMN "updated_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" DROP COLUMN "created_at"`,
    )
    await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "created_at"`)
  }
}
