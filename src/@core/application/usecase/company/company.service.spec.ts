import { CompanyTypeormRepository } from '../../../../@core/infra/db/company/company-typeorm.repository';
import { CompanySchema } from '../../../../@core/infra/db/company/company.schema';
import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
import { DataSource, Repository } from 'typeorm';
import { CompanyService } from './company.service';
import { DatabaseDevCredentials } from '../../../../shared/constants/database-settings';

const mockInputParams: CreateCompanyDto = {
  name: 'Dr.Consulta',
  cnpj: '483212344324',
  address: 'Rua Das Flores',
  telephone: '12324212342',
  carSpaces: 53,
  motorCycleSpaces: 43,
};

describe('CompanyService Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<CompanySchema>;
  let repository: CompanyTypeormRepository;
  let companyService: CompanyService;

  beforeEach(async () => {
    const databaseCredentials = new DatabaseDevCredentials();
    dataSource = new DataSource({
      type: 'mysql',
      host: databaseCredentials.host,
      port: databaseCredentials.port,
      username: databaseCredentials.username,
      password: databaseCredentials.password,
      database: databaseCredentials.password,
      synchronize: true,
      logging: true,
      entities: [CompanySchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(CompanySchema);
    repository = new CompanyTypeormRepository(ormRepo);
    companyService = new CompanyService(repository);
  });

  it('should fail to create a company if already exists', async () => {
    expect(async () => {
      await companyService.create(mockInputParams);
    }).rejects.toThrowError();
  });

  it('should create a company', async () => {
    await companyService.create(mockInputParams);
    const model = await ormRepo.findOneBy({ cnpj: '483212344324' });
    expect(model.address).toBe('Rua Das Flores');
    expect(model.carSpaces).toBe(53);
    expect(model.motorCycleSpaces).toBe(43);
    expect(model.cnpj).toBe('483212344324');
    expect(model.name).toBe('Dr.Consulta');
  });
});
