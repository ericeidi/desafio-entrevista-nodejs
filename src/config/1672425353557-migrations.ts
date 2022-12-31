import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672425353557 implements MigrationInterface {
  name = 'migrations1672425353557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vehicle_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`vehicleTypeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` ADD CONSTRAINT \`FK_6532113f42bd5b781e0f392029f\` FOREIGN KEY (\`vehicleTypeId\`) REFERENCES \`vehicle_type_schema\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` DROP FOREIGN KEY \`FK_6532113f42bd5b781e0f392029f\``,
    );
    await queryRunner.query(`DROP TABLE \`vehicle_schema\``);
  }
}
