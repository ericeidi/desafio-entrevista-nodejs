import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672363103739 implements MigrationInterface {
  name = 'migrations1672363103739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnpj\` varchar(15) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`company_schema\``);
  }
}
