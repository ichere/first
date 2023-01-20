import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddedEntitites1666272916461 implements MigrationInterface {
  public name = 'AddedEntitites1666272916461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(256), "contentLowRes" character varying(256), "contentThumbnail" character varying(256), "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id")); COMMENT ON COLUMN "photo"."content" IS 'The key of the photo.'; COMMENT ON COLUMN "photo"."contentLowRes" IS 'The low-resolution key of the photo.'; COMMENT ON COLUMN "photo"."contentThumbnail" IS 'The thumbnail of the photo.'`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(256) NOT NULL, "lastName" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "password" character varying(256) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE, "lastLoginDate" TIMESTAMP WITH TIME ZONE, "profilePictureId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_f58f9c73bc58e409038e56a405" UNIQUE ("profilePictureId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."id" IS 'Primary Object ID'; COMMENT ON COLUMN "user"."firstName" IS 'The user''s first name'; COMMENT ON COLUMN "user"."lastName" IS 'The user''s last name'; COMMENT ON COLUMN "user"."email" IS 'The user''s email'; COMMENT ON COLUMN "user"."phoneNumber" IS 'The user''s phone number'; COMMENT ON COLUMN "user"."password" IS 'The user''s password'; COMMENT ON COLUMN "user"."createdAt" IS 'The date the user was created'; COMMENT ON COLUMN "user"."lastLoginDate" IS 'The user''s last logged in time'; COMMENT ON COLUMN "user"."profilePictureId" IS 'Public profile picture of the user.'`,
    );
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id")); COMMENT ON COLUMN "todo"."id" IS 'Primary Object ID'; COMMENT ON COLUMN "todo"."title" IS 'Title of the Todo'; COMMENT ON COLUMN "todo"."description" IS 'Description of the task...'; COMMENT ON COLUMN "todo"."userId" IS 'The user that owns the todo.'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`);
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "photo"`);
  }
}
