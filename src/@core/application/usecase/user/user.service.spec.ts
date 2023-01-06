import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { dataSourceDevParams } from '../../../../shared/constants/database-dev-settings';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { UserTypeormRepository } from '../../../infra/db/user/user-typeorm.repository';
import { UserSchema } from '../../../infra/db/user/user.schema';
import { UserService } from './user.service';

const mockInputParams: CreateUserDto = {
  id: 1,
  name: 'joao',
  username: 'joao123',
  email: 'joao@gmail.com',
  password: '123',
};

describe('UserService Test', () => {
  let dataSource: DataSource;
  let ormUserRepo: Repository<UserSchema>;
  let userRepository: UserTypeormRepository;
  let userService: UserService;

  beforeEach(async () => {
    dataSource = new DataSource(dataSourceDevParams as DataSourceOptions);
    await dataSource.initialize();
    ormUserRepo = dataSource.getRepository(UserSchema);
    userRepository = new UserTypeormRepository(ormUserRepo);
    userService = new UserService(userRepository);
  });

  afterAll(async () => {
    dataSource.destroy();
  });

  it('should create an user', async () => {
    const createdUser = await userService.create(mockInputParams);
    const model = await ormUserRepo.findOneBy({ id: createdUser.id });
    expect(model.password).toBe('123');
    expect(model.email).toBe('joao@gmail.com');
    expect(model.name).toBe('joao');
  });

  it('should list all users', async () => {
    await userService.create(mockInputParams);
    await userService.create({
      id: 2,
      name: 'joao2',
      username: 'joao346',
      email: 'joao2@gmail.com',
      password: '123',
    });
    const model = await userService.findAll();
    expect(model).toEqual([
      mockInputParams,
      {
        id: 2,
        name: 'joao2',
        username: 'joao346',
        email: 'joao2@gmail.com',
        password: '123',
      },
    ]);
  });
  it('should list an user by id', async () => {
    await userService.create(mockInputParams);
    const model = await userService.findById(mockInputParams.id);
    expect(model).toBeTruthy();
  });
  it('should update an user by id', async () => {
    await userService.create(mockInputParams);
    const model = await userService.update(mockInputParams.id, mockInputParams);
    expect(model).toBe(undefined);
  });
  it('should delete an user by id', async () => {
    await userService.create(mockInputParams);
    const model = await userService.delete(mockInputParams.id);
    expect(model).toBe(undefined);
  });
});
