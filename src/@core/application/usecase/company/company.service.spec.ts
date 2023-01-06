import { CompanyTypeormRepository } from '../../../../@core/infra/db/company/company-typeorm.repository';
import { CompanySchema } from '../../../../@core/infra/db/company/company.schema';
import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
import { DataSource, Repository } from 'typeorm';
import { CompanyService } from './company.service';
import { DatabaseDevCredentials } from '../../../../shared/constants/database-dev-settings';
import { ParkingLotReservationSchema } from '../../../infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';
import { VehicleTypeSchema } from '../../../infra/db/vehicle-type/vehicle-type.schema';
import { UserSchema } from '../../../infra/db/user/user.schema';

const mockInputParams: CreateCompanyDto = {
  name: 'Dr.Consulta',
  cnpj: '483212344324',
  address: 'Rua Das Flores',
  telephone: '12324212342',
  carSpaces: 53,
  motorCycleSpaces: 43,
};

const mockUpdateCompanyDto = {
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
      dropSchema: true,
      logging: true,
      entities: [
        CompanySchema,
        ParkingLotReservationSchema,
        VehicleSchema,
        VehicleTypeSchema,
        UserSchema,
      ],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(CompanySchema);
    repository = new CompanyTypeormRepository(ormRepo);
    companyService = new CompanyService(repository);
  });

  afterAll(async () => {
    dataSource.destroy();
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

  it('should list all companies', async () => {
    await companyService.create(mockInputParams);
    await companyService.create({
      name: 'Dr.Consufds',
      cnpj: '12321421552',
      telephone: '343242',
      address: 'Rua Das 42',
      carSpaces: 12,
      motorCycleSpaces: 32,
    });
    const model = await companyService.findAll();
    expect(model).toEqual([
      {
        id: 1,
        name: 'Dr.Consulta',
        cnpj: '483212344324',
        telephone: '12324212342',
        address: 'Rua Das Flores',
        carSpaces: 53,
        motorCycleSpaces: 43,
      },
      {
        id: 2,
        name: 'Dr.Consufds',
        cnpj: '12321421552',
        telephone: '343242',
        address: 'Rua Das 42',
        carSpaces: 12,
        motorCycleSpaces: 32,
      },
    ]);
  });
  it('should list a company by cnpj', async () => {
    await companyService.create(mockInputParams);
    const model = await companyService.findByCnpj(mockInputParams.cnpj);
    expect(model).toBeTruthy();
  });
  it('should update a company by cnpj', async () => {
    await companyService.create(mockInputParams);
    const model = await companyService.update(
      mockInputParams.cnpj,
      mockUpdateCompanyDto,
    );
    expect(model).toBe(undefined);
  });
  it('should delete a company by cnpj', async () => {
    await companyService.create(mockInputParams);
    const model = await companyService.delete(mockInputParams.cnpj);
    expect(model).toBe(undefined);
  });
});
