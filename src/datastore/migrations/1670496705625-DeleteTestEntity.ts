import { MigrationInterface, QueryRunner } from 'typeorm';

export default class DeleteTestEntity1670496705625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "test"`);
  }

  public async down(): Promise<void> {
    // No going back
  }
}
