import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserRepository } from 'src/@core/domain/repository/user/user.repository';
import { VehicleTypeRepository } from 'src/@core/domain/repository/vehicle-type/vehicle-type.repository';
import { VehicleRepository } from 'src/@core/domain/repository/vehicle/vehicle.repository';
import { UserTypeormRepository } from 'src/@core/infra/db/user/user-typeorm.repository';
import { UserSchema } from 'src/@core/infra/db/user/user.schema';
import { VehicleTypeSchema } from 'src/@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleTypeTypeormRepository } from 'src/@core/infra/db/vehicle-type/vehicle-typeorm.repository';
import { VehicleTypeormRepository } from 'src/@core/infra/db/vehicle/vehicle-typeorm.repository';
import { VehicleSchema } from 'src/@core/infra/db/vehicle/vehicle.schema';
import { DataSource } from 'typeorm';
import { UserService } from '../@core/application/usecase/user/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.auth';
import { jwtConstants } from '../shared/constants/jwt-secret';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: UserTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeormRepository(dataSource.getRepository(UserSchema));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: VehicleTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new VehicleTypeormRepository(
          dataSource.getRepository(VehicleSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: VehicleTypeTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new VehicleTypeTypeormRepository(
          dataSource.getRepository(VehicleTypeSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: UserService,
      useFactory: (
        userRepository: UserRepository,
        vehicleTypeRepository: VehicleTypeRepository,
        vehicleRepository: VehicleRepository,
      ) => {
        return new UserService(
          userRepository,
          vehicleTypeRepository,
          vehicleRepository,
        );
      },
      inject: [
        UserTypeormRepository,
        VehicleTypeTypeormRepository,
        VehicleTypeormRepository,
      ],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
