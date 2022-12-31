import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672493027270 implements MigrationInterface {
  name = 'migrations1672493027270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`parking_lot_reservation_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`arrival_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`depart_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`vehicleId\` int NULL, \`companyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
    await queryRunner.query(`DROP TABLE \`parking_lot_reservation_schema\``);
  }
}
