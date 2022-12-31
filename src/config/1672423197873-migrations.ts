import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672423197873 implements MigrationInterface {
  name = 'migrations1672423197873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnpj\` varchar(14) NOT NULL, \`telephone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`car_spaces\` int NOT NULL, \`motorcyle_spaces\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicle_type_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`type\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`vehicle_type_schema\``);
    await queryRunner.query(`DROP TABLE \`company_schema\``);
  }
}
