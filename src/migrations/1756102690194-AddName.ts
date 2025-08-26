import { MigrationInterface, QueryRunner } from "typeorm";

export class AddName1756102690194 implements MigrationInterface {
    name = 'AddName1756102690194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" RENAME COLUMN "age" TO "surnamename"`);
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "surnamename"`);
        await queryRunner.query(`ALTER TABLE "example" ADD "surnamename" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "surnamename"`);
        await queryRunner.query(`ALTER TABLE "example" ADD "surnamename" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "example" RENAME COLUMN "surnamename" TO "age"`);
    }

}
