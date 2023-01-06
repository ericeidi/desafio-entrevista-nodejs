import { UserTypeormRepository } from '../../../../@core/infra/db/user/user-typeorm.repository';
import { VehicleTypeormRepository } from '../../../../@core/infra/db/vehicle/vehicle-typeorm.repository';
import { CreateVehicleDto } from '../../../../vehicle/dto/create-vehicle.dto';
import { DataSource, Repository } from 'typeorm';
import { DatabaseDevCredentials } from '../../../../shared/constants/database-dev-settings';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { CreateVehicleTypeDto } from '../../../../vehicle-type/dto/create-vehicle-type.dto';
import { User } from '../../../domain/entity/user/user';
import { VehicleType } from '../../../domain/entity/vehicle-type/vehicle-type';
import { CompanySchema } from '../../../infra/db/company/company.schema';
import { ParkingLotReservationSchema } from '../../../infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { UserSchema } from '../../../infra/db/user/user.schema';
import { VehicleTypeSchema } from '../../../infra/db/vehicle-type/vehicle-type.schema';
import { VehicleTypeTypeormRepository } from '../../../infra/db/vehicle-type/vehicle-typeorm.repository';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';
import { VehicleService } from './vehicle.service';

const mockInputParams: CreateVehicleDto = {
  licensePlate: '123123',
  userId: 1,
  vehicleTypeId: 1,
};

const vehicleTypeInput: CreateVehicleTypeDto = {
  brand: 'toyota',
  model: 'yaris',
  color: 'silver',
  type: 1,
};

const userInput: CreateUserDto = {
  name: 'joao',
  username: 'joao123',
  email: 'joao@gmail.com',
  password: '123456',
};

describe('Vehicle Service Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<VehicleSchema>;
  let ormUserRepo: Repository<UserSchema>;
  let userRepository: UserTypeormRepository;
  let vehicleRepository: VehicleTypeormRepository;
  let vehicleService: VehicleService;
  let ormVehicleTypeRepo: Repository<VehicleTypeSchema>;
  let vehicleTypeRepository: VehicleTypeTypeormRepository;

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
        VehicleSchema,
        VehicleTypeSchema,
        UserSchema,
        CompanySchema,
        ParkingLotReservationSchema,
      ],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(VehicleSchema);
    vehicleRepository = new VehicleTypeormRepository(ormRepo);
    ormUserRepo = dataSource.getRepository(UserSchema);
    userRepository = new UserTypeormRepository(ormUserRepo);
    ormVehicleTypeRepo = dataSource.getRepository(VehicleTypeSchema);
    vehicleTypeRepository = new VehicleTypeTypeormRepository(
      ormVehicleTypeRepo,
    );

    vehicleService = new VehicleService(
      vehicleRepository,
      vehicleTypeRepository,
      userRepository,
    );
  });
  afterAll(async () => {
    dataSource.destroy();
  });

  it('should create a vehicle', async () => {
    const userCreated = new User(userInput);
    await userRepository.insert(userCreated);
    const vehicleTypeCreated = new VehicleType(vehicleTypeInput);
    await vehicleTypeRepository.insert(vehicleTypeCreated);
    const createdVehicle = await vehicleService.create(mockInputParams);
    const model = await ormRepo.findOneBy({ id: createdVehicle.id });
    expect(model.licensePlate).toBe('123123');
  });
});
