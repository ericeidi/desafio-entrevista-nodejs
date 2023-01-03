import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanySchema } from 'src/@core/infra/db/company/company.schema';
import { VehicleTypeSchema } from 'src/@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleSchema } from 'src/@core/infra/db/vehicle/vehicle.schema';
import { UserSchema } from '../../@core/infra/db/user/user.schema';
import { ParkingLotReservationSchema } from '../../@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        timezone: 'Z',
        entities: [
          CompanySchema,
          VehicleTypeSchema,
          VehicleSchema,
          UserSchema,
          ParkingLotReservationSchema,
        ],
        autoLoadEntities: true,
      }),
    }),
  ],
})
class DatabaseModule {}

export default DatabaseModule;
