import { MigrationInterface, QueryRunner } from 'typeorm'

export class CorrectionInRelationsPetOrg1713174945885
  implements MigrationInterface
{
  name = 'CorrectionInRelationsPetOrg1713174945885'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-15T09:55:46.737Z'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13'`,
    )
  }
}
