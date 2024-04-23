import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddingCoordinatesColumn1713224986212
  implements MigrationInterface
{
  name = 'AddingCoordinatesColumn1713224986212'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ADD "latitude" double precision`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD "longitude" double precision`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "longitude"`)
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "latitude"`)
  }
}
