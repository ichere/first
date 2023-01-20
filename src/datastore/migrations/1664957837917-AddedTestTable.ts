import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddedTestTable1664957837917 implements MigrationInterface {
  public name = 'AddedTestTable1664957837917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "test" ("id" SERIAL NOT NULL, "firstName" character varying(256) NOT NULL, "lastName" character varying(256) NOT NULL, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id")); COMMENT ON COLUMN "test"."id" IS 'Primary Object ID'; COMMENT ON COLUMN "test"."firstName" IS 'The user''s first name'; COMMENT ON COLUMN "test"."lastName" IS 'The user''s last name'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "test"`);
  }
}
