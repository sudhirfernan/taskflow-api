import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColumn1756786935227 implements MigrationInterface {
    name = 'AddedColumn1756786935227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ADD "isActive" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "isActive"`);
    }

}
