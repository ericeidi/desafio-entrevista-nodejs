import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './@core/domain/entity/company/company';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanySchema } from './@core/infra/db/company/company.schema';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [CompanySchema],
      synchronize: true,
      dropSchema: true,
    }),
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
