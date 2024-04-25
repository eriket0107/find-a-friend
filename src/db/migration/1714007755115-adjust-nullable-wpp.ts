import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustNullableWpp1714007755115 implements MigrationInterface {
    name = 'AdjustNullableWpp1714007755115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "whatsapp" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "whatsapp" SET NOT NULL`);
    }

}
