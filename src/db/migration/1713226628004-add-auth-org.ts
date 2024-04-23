import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAuthOrg1713226628004 implements MigrationInterface {
  name = 'AddAuthOrg1713226628004'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "phone"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "email" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_5d06de67ef6ab02cbd938988bb1" UNIQUE ("email")`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "password" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_d8fd9e1d79363b3659e1b7db5f7" UNIQUE ("password")`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "whatsapp" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "whatsapp"`)
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_d8fd9e1d79363b3659e1b7db5f7"`,
    )
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "password"`)
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_5d06de67ef6ab02cbd938988bb1"`,
    )
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "phone" character varying NOT NULL`,
    )
  }
}
