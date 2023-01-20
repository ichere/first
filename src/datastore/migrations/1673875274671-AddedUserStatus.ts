import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddedUserStatus1673875274671 implements MigrationInterface {
  public name = 'AddedUserStatus1673875274671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "status" character varying NOT NULL DEFAULT 'UNVERIFIED'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."status" IS 'The current status of the user. Possible Options are: ACTIVE, UNVERIFIED, SUSPENDED, DELETED, DEACTIVATED.'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."status" IS 'The current status of the user. Possible Options are: ACTIVE, UNVERIFIED, SUSPENDED, DELETED, DEACTIVATED.'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
  }
}
