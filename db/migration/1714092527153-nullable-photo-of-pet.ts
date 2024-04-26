import { MigrationInterface, QueryRunner } from "typeorm";

export class NullablePhotoOfPet1714092527153 implements MigrationInterface {
    name = 'NullablePhotoOfPet1714092527153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "photo" SET NOT NULL`);
    }

}
