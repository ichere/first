import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InitialMigration1674332576515 implements MigrationInterface {
  public name = 'InitialMigration1674332576515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(256) NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."id" IS 'Primary Object ID'; COMMENT ON COLUMN "user"."userName" IS 'The user''s userName'; COMMENT ON COLUMN "user"."email" IS 'The user''s email'; COMMENT ON COLUMN "user"."password" IS 'The user''s password'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
