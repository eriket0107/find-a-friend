import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdjustingAddressIdColumn1712978430252
  implements MigrationInterface
{
  name = 'AdjustingAddressIdColumn1712978430252'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`,
    )
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13T03:20:31.078Z'`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "addressId"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "addressId" uuid`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271" UNIQUE ("addressId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "addressId"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "addressId" integer`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "date" SET DEFAULT '2024-04-13'`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`,
    )
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "address" ADD "id" SERIAL NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
