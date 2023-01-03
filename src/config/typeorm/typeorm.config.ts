import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CompanySchema } from '../../@core/infra/db/company/company.schema';
import { ParkingLotReservationSchema } from '../../@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { UserSchema } from '../../@core/infra/db/user/user.schema';
import { VehicleTypeSchema } from '../../@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleSchema } from '../../@core/infra/db/vehicle/vehicle.schema';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST'),
  port: configService.get<number>('MYSQL_PORT'),
  username: configService.get<string>('MYSQL_USER'),
  password: configService.get<string>('MYSQL_PASSWORD'),
  database: configService.get<string>('MYSQL_DATABASE'),
  entities: [
    CompanySchema,
    VehicleTypeSchema,
    VehicleSchema,
    UserSchema,
    ParkingLotReservationSchema,
  ],
  migrations: [],
});
