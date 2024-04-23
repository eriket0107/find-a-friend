import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdjustWppNumberLength1713695271589 implements MigrationInterface {
  name = 'AdjustWppNumberLength1713695271589'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "whatsapp"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "whatsapp" character varying(11) NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "whatsapp"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "whatsapp" character varying NOT NULL`,
    )
  }
}
