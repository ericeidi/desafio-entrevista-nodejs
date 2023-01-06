import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { ParkingLotReservationRepository } from '../../../../@core/domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { CompanyTypeormRepository } from '../../../../@core/infra/db/company/company-typeorm.repository';
import { UserTypeormRepository } from '../../../../@core/infra/db/user/user-typeorm.repository';
import { VehicleTypeormRepository } from '../../../../@core/infra/db/vehicle/vehicle-typeorm.repository';
import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
import { CreateParkingReservationDto } from '../../../../parking-lot-reservation/dto/create-parking-reservation.dto';
import { dataSourceDevParams } from '../../../../shared/constants/database-dev-settings';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { CreateVehicleTypeDto } from '../../../../vehicle-type/dto/create-vehicle-type.dto';
import { Company } from '../../../domain/entity/company/company';
import { User } from '../../../domain/entity/user/user';
import { VehicleType } from '../../../domain/entity/vehicle-type/vehicle-type';
import { Vehicle } from '../../../domain/entity/vehicle/vehicle';
import { CompanySchema } from '../../../infra/db/company/company.schema';
import { ParkingLotReservationTypeormRepository } from '../../../infra/db/parking-lot-reservation/parking-lot-reservation-typeorm.repository';
import { ParkingLotReservationSchema } from '../../../infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { UserSchema } from '../../../infra/db/user/user.schema';
import { VehicleTypeSchema } from '../../../infra/db/vehicle-type/vehicle-type.schema';
import { VehicleTypeTypeormRepository } from '../../../infra/db/vehicle-type/vehicle-typeorm.repository';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';
import { ParkingLotReservationService } from './parking-lot-reservation.service';

const mockInputParams: CreateParkingReservationDto = {
  licensePlate: '123123',
  cnpj: '483212344324',
};

const mockCompany: CreateCompanyDto = {
  name: 'Dr.Consulta',
  cnpj: '483212344324',
  address: 'Rua Das Flores',
  telephone: '12324212342',
  carSpaces: 53,
  motorCycleSpaces: 43,
};

const vehicleTypeInput: CreateVehicleTypeDto = {
  id: 1,
  brand: 'toyota',
  model: 'yaris',
  color: 'silver',
  type: 1,
};

const userInput: CreateUserDto = {
  id: 1,
  name: 'joao',
  username: 'joao123',
  email: 'joao@gmail.com',
  password: '123456',
};

describe('Vehicle Service Test', () => {
  let dataSource: DataSource;
  let ormVehicleRepo: Repository<VehicleSchema>;
  let ormUserRepo: Repository<UserSchema>;
  let userRepository: UserTypeormRepository;
  let vehicleRepository: VehicleTypeormRepository;
  let parkingLotReservationService: ParkingLotReservationService;
  let ormVehicleTypeRepo: Repository<VehicleTypeSchema>;
  let vehicleTypeRepository: VehicleTypeTypeormRepository;
  let ormCompanyRepo: Repository<CompanySchema>;
  let companyRepository: CompanyTypeormRepository;
  let ormParkingLotReservationRepo: Repository<ParkingLotReservationSchema>;
  let parkingLotReservationRepository: ParkingLotReservationRepository;

  beforeEach(async () => {
    dataSource = new DataSource(dataSourceDevParams as DataSourceOptions);
    await dataSource.initialize();
    ormVehicleRepo = dataSource.getRepository(VehicleSchema);
    vehicleRepository = new VehicleTypeormRepository(ormVehicleRepo);
    ormUserRepo = dataSource.getRepository(UserSchema);
    userRepository = new UserTypeormRepository(ormUserRepo);
    ormVehicleTypeRepo = dataSource.getRepository(VehicleTypeSchema);
    vehicleTypeRepository = new VehicleTypeTypeormRepository(
      ormVehicleTypeRepo,
    );
    ormCompanyRepo = dataSource.getRepository(CompanySchema);
    companyRepository = new CompanyTypeormRepository(ormCompanyRepo);
    ormParkingLotReservationRepo = dataSource.getRepository(
      ParkingLotReservationSchema,
    );
    parkingLotReservationRepository =
      new ParkingLotReservationTypeormRepository(ormParkingLotReservationRepo);

    parkingLotReservationService = new ParkingLotReservationService(
      vehicleRepository,
      companyRepository,
      parkingLotReservationRepository,
    );
    const company = new Company(mockCompany);
    await companyRepository.insert(company);
    const userCreated = new User(userInput);
    await userRepository.insert(userCreated);
    const vehicleTypeCreated = new VehicleType(vehicleTypeInput);
    await vehicleTypeRepository.insert(vehicleTypeCreated);
    const vehicle = new Vehicle('123123', userCreated, vehicleTypeCreated);
    await vehicleRepository.insert(vehicle);
  });

  afterAll(async () => {
    dataSource.destroy();
  });

  it('should start a reservation', async () => {
    const res = await parkingLotReservationService.startReservation(
      mockInputParams,
    );
    expect(res.arrivalTime).toBeTruthy();
    expect(res.company).toEqual({
      address: 'Rua Das Flores',
      carSpaces: 52,
      cnpj: '483212344324',
      id: 1,
      motorCycleSpaces: 43,
      name: 'Dr.Consulta',
      telephone: '12324212342',
    });
    expect(res.vehicle).toEqual({
      id: 1,
      licensePlate: '123123',
      user: {
        email: 'joao@gmail.com',
        id: 1,
        name: 'joao',
        password: '123456',
        username: 'joao123',
      },
      vehicleType: {
        brand: 'toyota',
        color: 'silver',
        id: 1,
        model: 'yaris',
        type: 1,
      },
    });
  });

  it('should finish a reservation', async () => {
    await parkingLotReservationService.startReservation(mockInputParams);
    expect(
      await parkingLotReservationService.finishReservation(mockInputParams),
    ).toBe(undefined);
  });
});
