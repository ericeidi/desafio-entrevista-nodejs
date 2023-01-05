import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from 'src/@core/application/usecase/vehicle/vehicle.service';
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
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleSchema, VehicleTypeSchema])],
  controllers: [VehicleController],
  providers: [
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
      provide: VehicleService,
      useFactory: (
        vehicleRepository: VehicleRepository,
        vehicleTypeRepository: VehicleTypeRepository,
        userRepository: UserRepository,
      ) => {
        return new VehicleService(
          vehicleRepository,
          vehicleTypeRepository,
          userRepository,
        );
      },
      inject: [
        VehicleTypeormRepository,
        VehicleTypeTypeormRepository,
        UserTypeormRepository,
      ],
    },
  ],
})
export class VehicleModule {}
