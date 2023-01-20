import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddUserIndexToTodo1667208335833 implements MigrationInterface {
  public name = 'AddUserIndexToTodo1667208335833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "user_todo" ON "todo" ("userId") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."user_todo"`);
  }
}
