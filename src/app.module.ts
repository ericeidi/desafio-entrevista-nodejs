import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './@core/domain/entity/company/company';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanySchema } from './@core/infra/db/company/company.schema';
import { CompanyModule } from './company/company.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { VehicleTypeSchema } from './@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleSchema } from './@core/infra/db/vehicle/vehicle.schema';
import { UserModule } from './user/user.module';
import { UserSchema } from './@core/infra/db/user/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        entities: [CompanySchema, VehicleTypeSchema, VehicleSchema, UserSchema],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    CompanyModule,
    VehicleTypeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
