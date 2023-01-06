import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { VehicleTypeSchema } from '../../../../@core/infra/db/vehicle-type/vehicle-type.schema';
import { dataSourceDevParams } from '../../../../shared/constants/database-dev-settings';
import { CreateVehicleTypeDto } from '../../../../vehicle-type/dto/create-vehicle-type.dto';
import { VehicleTypeTypeormRepository } from '../../../infra/db/vehicle-type/vehicle-typeorm.repository';
import { VehicleTypeService } from './vehicle-type.service';

const mockInputParams: CreateVehicleTypeDto = {
  id: 1,
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
    dataSource = new DataSource(dataSourceDevParams as DataSourceOptions);
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(VehicleTypeSchema);
    repository = new VehicleTypeTypeormRepository(ormRepo);
    vehicleTypeService = new VehicleTypeService(repository);
  });

  afterAll(async () => {
    dataSource.destroy();
  });

  it('should create a vehicle type', async () => {
    const createdVehicle = await vehicleTypeService.create(mockInputParams);
    const model = await ormRepo.findOneBy({ id: createdVehicle.id });
    expect(model.brand).toBe('chevrolet');
    expect(model.model).toBe('chevete');
    expect(model.color).toBe('preto');
    expect(model.type).toBe(1);
  });

  it('should list all vehicle type', async () => {
    await vehicleTypeService.create(mockInputParams);
    await vehicleTypeService.create({
      id: 2,
      brand: 'honda',
      model: 'biz',
      color: 'preto',
      type: 2,
    });
    const model = await vehicleTypeService.findAll();
    expect(model).toEqual([
      mockInputParams,
      {
        id: 2,
        brand: 'honda',
        model: 'biz',
        color: 'preto',
        type: 2,
      },
    ]);
  });
  it('should list an user by id', async () => {
    await vehicleTypeService.create(mockInputParams);
    const model = await vehicleTypeService.findById(mockInputParams.id);
    expect(model).toBeTruthy();
  });
  it('should update an user by id', async () => {
    await vehicleTypeService.create(mockInputParams);
    const model = await vehicleTypeService.update(
      mockInputParams.id,
      mockInputParams,
    );
    expect(model).toBe(undefined);
  });
  it('should delete an user by id', async () => {
    await vehicleTypeService.create(mockInputParams);
    const model = await vehicleTypeService.delete(mockInputParams.id);
    expect(model).toBe(undefined);
  });
});
