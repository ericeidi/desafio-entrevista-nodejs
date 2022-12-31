import { VehicleTypeSchema } from '../../../../@core/infra/db/vehicle-type/vehicle-type.schema';
import { DataSource, Repository } from 'typeorm';
import { DatabaseDevCredentials } from '../../../../shared/constants/database-settings';
import { CreateVehicleTypeDto } from '../../../../vehicle-type/dto/create-vehicle-type.dto';
import { VehicleTypeTypeormRepository } from '../../../infra/db/vehicle-type/vehicle-typeorm.repository';
import { VehicleTypeService } from './vehicle-type.service';

const mockInputParams: CreateVehicleTypeDto = {
  brand: 'chevrolet',
  model: 'chevete',
  color: 'preto',
  type: 1,
};

describe('VehicleType Service Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<VehicleTypeSchema>;
  let repository: VehicleTypeTypeormRepository;
  let vehicleTypeService: VehicleTypeService;

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
      entities: [VehicleTypeSchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(VehicleTypeSchema);
    repository = new VehicleTypeTypeormRepository(ormRepo);
    vehicleTypeService = new VehicleTypeService(repository);
  });

  it('should create a vehicle', async () => {
    const createdVehicle = await vehicleTypeService.create(mockInputParams);
    const model = await ormRepo.findOneBy({ id: createdVehicle.id });
    expect(model.brand).toBe('chevrolet');
    expect(model.model).toBe('chevete');
    expect(model.color).toBe('preto');
    expect(model.type).toBe(1);
  });
});
