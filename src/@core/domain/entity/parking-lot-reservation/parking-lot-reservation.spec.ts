import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { Company } from '../company/company';
import { User } from '../user/user';
import { VehicleType } from '../vehicle-type/vehicle-type';
import { Vehicle } from '../vehicle/vehicle';
import { ParkingLotReservation } from './parking-lot-reservation';
import { ConvertUtc } from '../../../../shared/utils/convert-utc';

const mockCarVehicleType: VehicleType = {
  id: 1,
  brand: 'chevrolet',
  model: 'montana',
  type: 1,
  color: 'prata',
};

const mockMotorcycleVehicleType: VehicleType = {
  id: 1,
  brand: 'honda',
  model: 'biz',
  type: 2,
  color: 'preta',
};

const mockUser: CreateUserDto = {
  id: 1,
  name: 'joao',
  email: 'joao@gmail.com',
  password: '123',
};

const mockInputCarVehicle: Vehicle = {
  licensePlate: '123421',
  user: new User(mockUser),
  vehicleType: mockCarVehicleType,
};

const mockInputMotorcycleVehicle: Vehicle = {
  licensePlate: '123421',
  user: new User(mockUser),
  vehicleType: mockMotorcycleVehicleType,
};

const mockInputCompany: Company = {
  id: null,
  name: 'Dr.Consulta',
  cnpj: '483212344324324',
  address: 'Rua Das Flores',
  telephone: '12324212342',
  carSpaces: 53,
  motorCycleSpaces: 43,
};

describe('Parking Lot Reservation Unit Tests', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date());
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  it('should create a new parking lot reservation', () => {
    const response = new ParkingLotReservation(
      mockInputCompany,
      mockInputCarVehicle,
    );
    expect(response).toEqual({
      id: null,
      company: mockInputCompany,
      vehicle: mockInputCarVehicle,
    });
  });

  it('should decrease one car space in the company if it is a car', () => {
    const response = new ParkingLotReservation(
      mockInputCompany,
      mockInputCarVehicle,
    );
    const decrease = response.handleDecreaseSpace();
    expect(decrease).toBe(52);
  });

  it('should decrease one motorcycle space in the company if it is a motorcycle', () => {
    const response = new ParkingLotReservation(
      mockInputCompany,
      mockInputMotorcycleVehicle,
    );
    const decrease = response.handleDecreaseSpace();
    expect(decrease).toBe(42);
  });

  it('should increase one car space in the company if it is a car', () => {
    const response = new ParkingLotReservation(
      {
        id: null,
        name: 'Dr.Consulta',
        cnpj: '483212344324324',
        address: 'Rua Das Flores',
        telephone: '12324212342',
        carSpaces: 53,
        motorCycleSpaces: 43,
      },
      mockInputCarVehicle,
    );
    const increase = response.handleIncreaseSpace();
    expect(increase).toBe(54);
  });

  it('should increase one motorcycle space in the company if it is a motorcycle', () => {
    const response = new ParkingLotReservation(
      {
        id: null,
        name: 'Dr.Consulta',
        cnpj: '483212344324324',
        address: 'Rua Das Flores',
        telephone: '12324212342',
        carSpaces: 53,
        motorCycleSpaces: 43,
      },
      mockInputMotorcycleVehicle,
    );
    const increase = response.handleIncreaseSpace();
    expect(increase).toBe(44);
  });

  it('should add a new depart time', () => {
    const response = new ParkingLotReservation(
      mockInputCompany,
      mockInputCarVehicle,
    );
    response.addDepartTime();
    expect(response.departTime).toBe(ConvertUtc(new Date()));
  });

  it('should add a new arrival time', () => {
    const response = new ParkingLotReservation(
      mockInputCompany,
      mockInputCarVehicle,
    );
    response.addArrivalTime();
    expect(response.arrivalTime).toBe(ConvertUtc(new Date()));
  });
});
