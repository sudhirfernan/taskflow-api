import { MigrationInterface, QueryRunner } from "typeorm";

export class Removed1756200573440 implements MigrationInterface {
    name = 'Removed1756200573440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" RENAME COLUMN "age" TO "description"`);
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "example" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "example" ADD "description" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "example" RENAME COLUMN "description" TO "age"`);
    }

}
