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
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
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
