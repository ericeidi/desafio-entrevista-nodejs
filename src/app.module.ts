import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySchema } from './@core/infra/db/company/company.schema';
import { ParkingLotReservationSchema } from './@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { UserSchema } from './@core/infra/db/user/user.schema';
import { VehicleTypeSchema } from './@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleSchema } from './@core/infra/db/vehicle/vehicle.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { ParkingLotReservationModule } from './parking-lot-reservation/parking-lot-reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    CompanyModule,
    VehicleTypeModule,
    UserModule,
    AuthModule,
    ParkingLotReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
