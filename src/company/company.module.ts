import { Module } from '@nestjs/common';

import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from 'src/@core/application/usecase/company/company.service';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { CompanyTypeormRepository } from 'src/@core/infra/db/company/company-typeorm.repository';
import { DataSource } from 'typeorm';
import { CompanySchema } from '../@core/infra/db/company/company.schema';
import { ParkingLotReservationTypeormRepository } from '../@core/infra/db/parking-lot-reservation/parking-lot-reservation-typeorm.repository';
import { ParkingLotReservationSchema } from '../@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { CompanyController } from './company.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanySchema, ParkingLotReservationSchema]),
  ],
  controllers: [CompanyController],
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
      provide: ParkingLotReservationTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new ParkingLotReservationTypeormRepository(
          dataSource.getRepository(ParkingLotReservationSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new CompanyService(companyRepository);
      },
      inject: [
        CompanyTypeormRepository,
        ParkingLotReservationTypeormRepository,
      ],
    },
  ],
})
export class CompanyModule {}
