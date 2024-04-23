import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatingRelationsBetweenOrgPet1712980542458
  implements MigrationInterface
{
  name = 'CreatingRelationsBetweenOrgPet1712980542458'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pet" ADD "organizationId" uuid`)
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0" UNIQUE ("name")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13T03:55:43.306Z'`,
    )
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_a730d8e90af7ecf1b7ae6c53e6f" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pet" DROP CONSTRAINT "FK_a730d8e90af7ecf1b7ae6c53e6f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13'`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0"`,
    )
    await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "organizationId"`)
  }
}
