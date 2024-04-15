import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakingPetsIndepentEntity1713177005100
  implements MigrationInterface
{
  name = 'MakingPetsIndepentEntity1713177005100'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-15T10:30:05.909Z'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-15'`,
    )
  }
}
