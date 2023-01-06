import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotReservationService } from 'src/@core/application/usecase/parking-lot-reservation/parking-lot-reservation.service';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { ParkingLotReservationRepository } from 'src/@core/domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { VehicleRepository } from 'src/@core/domain/repository/vehicle/vehicle.repository';
import { CompanyTypeormRepository } from 'src/@core/infra/db/company/company-typeorm.repository';
import { CompanySchema } from 'src/@core/infra/db/company/company.schema';
import { ParkingLotReservationTypeormRepository } from 'src/@core/infra/db/parking-lot-reservation/parking-lot-reservation-typeorm.repository';
import { ParkingLotReservationSchema } from 'src/@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { VehicleTypeormRepository } from 'src/@core/infra/db/vehicle/vehicle-typeorm.repository';
import { VehicleSchema } from 'src/@core/infra/db/vehicle/vehicle.schema';
import { DataSource } from 'typeorm';

import { ParkingLotReservationController } from './parking-lot-reservation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanySchema,
      ParkingLotReservationSchema,
      VehicleSchema,
    ]),
  ],
  controllers: [ParkingLotReservationController],
  providers: [
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
      provide: VehicleTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new VehicleTypeormRepository(
          dataSource.getRepository(VehicleSchema),
        );
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
      provide: ParkingLotReservationService,
      useFactory: (
        vehicleRepository: VehicleRepository,
        companyRepository: CompanyRepository,
        parkingLotReservationRepository: ParkingLotReservationRepository,
      ) => {
        return new ParkingLotReservationService(
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
export class ParkingLotReservationModule {}
