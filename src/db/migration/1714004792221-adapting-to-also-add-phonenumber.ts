import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdaptingToAlsoAddPhonenumber1714004792221
  implements MigrationInterface
{
  name = 'AdaptingToAlsoAddPhonenumber1714004792221'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "phone" character varying(11) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "whatsapp"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "whatsapp" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "whatsapp"`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "whatsapp" character varying(11) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "phone"`)
  }
}
