import { DataSource, Repository } from 'typeorm';
import { DatabaseDevCredentials } from '../../../../shared/constants/database-settings';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { UserTypeormRepository } from '../../../infra/db/user/user-typeorm.repository';
import { UserSchema } from '../../../infra/db/user/user.schema';
import { VehicleTypeSchema } from '../../../infra/db/vehicle-type/vehicle-type.schema';
import { VehicleTypeTypeormRepository } from '../../../infra/db/vehicle-type/vehicle-typeorm.repository';
import { VehicleTypeormRepository } from '../../../infra/db/vehicle/vehicle-typeorm.repository';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';
import { UserService } from './user.service';

const mockInputParams: CreateUserDto = {
  id: null,
  name: 'joao',
  email: 'joao@gmail.com',
  password: '123',
  vehicleTypeId: 1,
  licensePlate: '123421',
};

describe('UserService Test', () => {
  let dataSource: DataSource;
  let ormUserRepo: Repository<UserSchema>;
  let ormVehicleTypeRepo: Repository<VehicleTypeSchema>;
  let ormVehicleRepo: Repository<VehicleSchema>;
  let userRepository: UserTypeormRepository;
  let vehicleRepository: VehicleTypeormRepository;
  let vehicleTypeRepository: VehicleTypeTypeormRepository;
  let userService: UserService;

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
      entities: [UserSchema, VehicleSchema, VehicleTypeSchema],
    });
    await dataSource.initialize();
    ormUserRepo = dataSource.getRepository(UserSchema);
    userRepository = new UserTypeormRepository(ormUserRepo);
    ormVehicleTypeRepo = dataSource.getRepository(VehicleTypeSchema);
    vehicleTypeRepository = new VehicleTypeTypeormRepository(
      ormVehicleTypeRepo,
    );

    ormVehicleRepo = dataSource.getRepository(VehicleSchema);
    vehicleRepository = new VehicleTypeormRepository(ormVehicleRepo);
    userService = new UserService(
      userRepository,
      vehicleTypeRepository,
      vehicleRepository,
    );
  });

  it('should create an user', async () => {
    const createdUser = await userService.create(mockInputParams);
    const model = await ormUserRepo.findOneBy({ id: createdUser.id });
    expect(model.password).toBe('123');
    expect(model.email).toBe('joao@gmail.com');
    expect(model.name).toBe('joao');
  });
});
