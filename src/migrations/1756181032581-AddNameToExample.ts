import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameToExample1756181032581 implements MigrationInterface {
    name = 'AddNameToExample1756181032581'

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
