import { Module } from '@nestjs/common';
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
import { ParkingLotService } from 'src/@core/application/usecase/parking-lot/parking-lot.service';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { CompanyTypeormRepository } from 'src/@core/infra/db/company/company-typeorm.repository';
import { CompanySchema } from 'src/@core/infra/db/company/company.schema';
import { ParkingLotReservationRepository } from 'src/@core/domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { ParkingLotReservationTypeormRepository } from 'src/@core/infra/db/parking-lot-reservation/parking-lot-reservation-typeorm.repository';
import { ParkingLotReservationSchema } from 'src/@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeormRepository(dataSource.getRepository(UserSchema));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: ParkingLotReservationTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new ParkingLotReservationTypeormRepository(
          dataSource.getRepository(ParkingLotReservationSchema),
        );
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
      provide: CompanyTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new CompanyTypeormRepository(
          dataSource.getRepository(CompanySchema),
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
    {
      provide: ParkingLotService,
      useFactory: (
        vehicleRepository: VehicleRepository,
        companyRepository: CompanyRepository,
        parkingLotReservationRepository: ParkingLotReservationRepository,
      ) => {
        return new ParkingLotService(
          vehicleRepository,
          companyRepository,
          parkingLotReservationRepository,
        );
      },
      inject: [
        VehicleTypeormRepository,
        CompanyTypeormRepository,
        ParkingLotReservationTypeormRepository,
      ],
    },
  ],
})
export class UserModule {}
