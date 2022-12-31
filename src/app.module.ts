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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    CompanyModule,
    VehicleTypeModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
