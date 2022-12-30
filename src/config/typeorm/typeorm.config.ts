import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CompanySchema } from '../../@core/infra/db/company/company.schema';
import { migrations1672363103739 } from '../migrations/1672363103739-migrations';
import { migrations1672409751018 } from '../migrations/1672409751018-migrations';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: [CompanySchema],
  migrations: [migrations1672363103739, migrations1672409751018],
});
