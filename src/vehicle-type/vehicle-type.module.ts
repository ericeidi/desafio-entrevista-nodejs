import { Module } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { VehicleTypeService } from 'src/@core/application/usecase/vehicle-type/vehicle-type.service';
import { VehicleTypeRepository } from 'src/@core/domain/repository/vehicle-type/vehicle-type.repository';
import { VehicleTypeSchema } from 'src/@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleTypeTypeormRepository } from 'src/@core/infra/db/vehicle-type/vehicle-typeorm.repository';
import { DataSource } from 'typeorm';
import { VehicleTypeController } from './vehicle-type.controller';

@Module({
  controllers: [VehicleTypeController],
  providers: [
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
      provide: VehicleTypeService,
      useFactory: (repo: VehicleTypeRepository) => {
        return new VehicleTypeService(repo);
      },
      inject: [VehicleTypeTypeormRepository],
    },
  ],
})
export class VehicleTypeModule {}
