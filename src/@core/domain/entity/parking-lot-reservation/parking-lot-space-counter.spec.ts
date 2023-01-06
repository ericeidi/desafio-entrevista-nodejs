import { Company } from '../company/company';
import { ParkingLotReservation } from './parking-lot-reservation';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { User } from '../user/user';
import { VehicleType } from '../vehicle-type/vehicle-type';
import { Vehicle } from '../vehicle/vehicle';
import { ParkingLotSpaceCounter } from './parking-lot-space-counter';

const mockCarVehicleType: VehicleType = {
  id: 1,
  brand: 'chevrolet',
  model: 'montana',
  type: 1,
  color: 'prata',
};
const mockUser: CreateUserDto = {
  id: 1,
  name: 'joao',
  username: 'joao123',
  email: 'joao@gmail.com',
  password: '123',
};

const mockInputCarVehicle: Vehicle = {
  licensePlate: '123421',
  user: new User(mockUser),
  vehicleType: mockCarVehicleType,
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

describe('Parking Lot Counter Unit Tests', () => {
  it('should count +1 if the arrival time is not null', () => {
    const parkingLotReservation = new ParkingLotReservation(
      mockInputCompany,
      mockInputCarVehicle,
    );
    parkingLotReservation.addArrivalTime();

    const res = new ParkingLotSpaceCounter().handleCountArrivalSpace([
      parkingLotReservation,
    ]);
    expect(res).toBe(1);
  });

  it('should count +1 if the depart time is not null', () => {
    const parkingLotReservation = new ParkingLotReservation(
      mockInputCompany,
      mockInputCarVehicle,
    );
    parkingLotReservation.addDepartTime();

    const res = new ParkingLotSpaceCounter().handleCountDepartSpace([
      parkingLotReservation,
    ]);
    expect(res).toBe(1);
  });
});
