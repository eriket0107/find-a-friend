import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdjustingAddressNullable1713178917598
  implements MigrationInterface
{
  name = 'AdjustingAddressNullable1713178917598'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-15T11:01:58.393Z'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-15'`,
    )
  }
}
