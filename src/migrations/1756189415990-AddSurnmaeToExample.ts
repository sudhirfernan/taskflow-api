import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSurnmaeToExample1756189415990 implements MigrationInterface {
    name = 'AddSurnmaeToExample1756189415990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ADD "surname" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "surname"`);
    }

}
