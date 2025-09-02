import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDescription1756700377556 implements MigrationInterface {
    name = 'AddedDescription1756700377556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" RENAME COLUMN "finalName" TO "description"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "titleName"`);
        await queryRunner.query(`ALTER TABLE "example" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "titleName" character varying`);
        await queryRunner.query(`ALTER TABLE "example" RENAME COLUMN "description" TO "finalName"`);
    }

}
