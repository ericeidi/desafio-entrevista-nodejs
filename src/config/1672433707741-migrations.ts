import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672433707741 implements MigrationInterface {
  name = 'migrations1672433707741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_schema\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` DROP COLUMN \`url\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` ADD \`license_plate\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` ADD CONSTRAINT \`FK_f63e9db7cd78f203a21acc1bde8\` FOREIGN KEY (\`userId\`) REFERENCES \`user_schema\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` DROP FOREIGN KEY \`FK_f63e9db7cd78f203a21acc1bde8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` DROP COLUMN \`license_plate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` ADD \`url\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`user_schema\``);
  }
}
