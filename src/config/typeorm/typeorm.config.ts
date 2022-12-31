import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CompanySchema } from '../../@core/infra/db/company/company.schema';
import { UserSchema } from '../../@core/infra/db/user/user.schema';
import { VehicleTypeSchema } from '../../@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleSchema } from '../../@core/infra/db/vehicle/vehicle.schema';
import { migrations1672434244669 } from '../1672434244669-migrations';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get<string>('HOST'),
  port: configService.get<number>('PORT'),
  username: configService.get<string>('USER'),
  password: configService.get<string>('PASSWORD'),
  database: configService.get<string>('DATABASE'),
  entities: [CompanySchema, VehicleTypeSchema, VehicleSchema, UserSchema],
  migrations: [migrations1672434244669],
});
