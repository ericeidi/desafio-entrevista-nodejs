import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672409751018 implements MigrationInterface {
  name = 'migrations1672409751018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` ADD \`telephone\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` ADD \`address\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` ADD \`carSpaces\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` ADD \`motorCycleSpaces\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` DROP COLUMN \`cnpj\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` ADD \`cnpj\` varchar(14) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` DROP COLUMN \`cnpj\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` ADD \`cnpj\` varchar(15) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` DROP COLUMN \`motorCycleSpaces\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` DROP COLUMN \`carSpaces\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` DROP COLUMN \`address\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_schema\` DROP COLUMN \`telephone\``,
    );
  }
}
