import { Module } from '@nestjs/common';
import { UserServiceNest } from './user.service';
import { UserController } from './user.controller';
import { UserTypeormRepository } from 'src/@core/infra/db/user/user-typeorm.repository';
import { UserService } from 'src/@core/application/usecase/user/user.service';
import { UserRepository } from 'src/@core/domain/repository/user/user.repository';
import { DataSource } from 'typeorm';
import { UserSchema } from 'src/@core/infra/db/user/user.schema';
import { getDataSourceToken } from '@nestjs/typeorm';
import { VehicleTypeRepository } from 'src/@core/domain/repository/vehicle-type/vehicle-type.repository';
import { VehicleTypeTypeormRepository } from '../@core/infra/db/vehicle-type/vehicle-typeorm.repository';
import { VehicleTypeSchema } from '../@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleTypeormRepository } from 'src/@core/infra/db/vehicle/vehicle-typeorm.repository';
import { VehicleSchema } from 'src/@core/infra/db/vehicle/vehicle.schema';
import { VehicleRepository } from 'src/@core/domain/repository/vehicle/vehicle.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserServiceNest,
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
})
export class UserModule {}
