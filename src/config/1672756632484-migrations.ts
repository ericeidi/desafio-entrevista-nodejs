import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672756632484 implements MigrationInterface {
  name = 'migrations1672756632484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicle_type_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`type\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicle_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`license_plate\` varchar(255) NOT NULL, \`vehicleTypeId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`parking_lot_reservation_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`arrival_time\` datetime NOT NULL, \`depart_time\` datetime NULL, \`vehicleId\` int NULL, \`companyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`company_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnpj\` varchar(14) NOT NULL, \`telephone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`car_spaces\` int NOT NULL, \`motorcyle_spaces\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` ADD CONSTRAINT \`FK_6532113f42bd5b781e0f392029f\` FOREIGN KEY (\`vehicleTypeId\`) REFERENCES \`vehicle_type_schema\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` ADD CONSTRAINT \`FK_f63e9db7cd78f203a21acc1bde8\` FOREIGN KEY (\`userId\`) REFERENCES \`user_schema\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_lot_reservation_schema\` ADD CONSTRAINT \`FK_a77201ec4fec90bc6c81980baa6\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle_schema\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_lot_reservation_schema\` ADD CONSTRAINT \`FK_396f40bc86b84d8ccfdb754899f\` FOREIGN KEY (\`companyId\`) REFERENCES \`company_schema\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_lot_reservation_schema\` DROP FOREIGN KEY \`FK_396f40bc86b84d8ccfdb754899f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_lot_reservation_schema\` DROP FOREIGN KEY \`FK_a77201ec4fec90bc6c81980baa6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` DROP FOREIGN KEY \`FK_f63e9db7cd78f203a21acc1bde8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicle_schema\` DROP FOREIGN KEY \`FK_6532113f42bd5b781e0f392029f\``,
    );
    await queryRunner.query(`DROP TABLE \`company_schema\``);
    await queryRunner.query(`DROP TABLE \`parking_lot_reservation_schema\``);
    await queryRunner.query(`DROP TABLE \`vehicle_schema\``);
    await queryRunner.query(`DROP TABLE \`vehicle_type_schema\``);
    await queryRunner.query(`DROP TABLE \`user_schema\``);
  }
}
