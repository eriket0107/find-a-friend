import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdjustingAll1713179240836 implements MigrationInterface {
  name = 'AdjustingAll1713179240836'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date"`)
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "date" date NOT NULL DEFAULT '2024-04-15'`,
    )
  }
}
