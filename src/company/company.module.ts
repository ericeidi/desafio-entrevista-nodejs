import { Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { CompanyTypeormRepository } from 'src/@core/infra/db/company/company-typeorm.repository';
import { CompanySchema } from 'src/@core/infra/db/company/company.schema';
import { DataSource } from 'typeorm';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { CompanyService } from 'src/@core/application/usecase/company/company.service';
import { CompanyServiceNest } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySchema])],
  controllers: [CompanyController],
  providers: [
    CompanyServiceNest,
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
      provide: CompanyService,
      useFactory: (repo: CompanyRepository) => {
        return new CompanyService(repo);
      },
      inject: [CompanyTypeormRepository],
    },
  ],
})
export class CompanyModule {}
