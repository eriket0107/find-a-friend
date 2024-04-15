import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddingTraitsCols1712981894976 implements MigrationInterface {
  name = 'AddingTraitsCols1712981894976'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pet" ADD "traits" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13T04:18:15.875Z'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13'`,
    )
    await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "traits"`)
  }
}
