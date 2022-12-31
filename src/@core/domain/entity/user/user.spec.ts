import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { VehicleType } from '../vehicle-type/vehicle-type';
import { User } from './User';
import { Vehicle } from '../vehicle/vehicle';

const mockVehicleType: VehicleType = {
  id: 1,
  brand: 'chevrolet',
  model: 'montana',
  type: 1,
  color: 'prata',
};

const mockInputParams: CreateUserDto = {
  id: null,
  name: 'joao',
  email: 'joao@gmail.com',
  password: '123',
  vehicleTypeId: 1,
  licensePlate: '123421',
};

const mockOutputVehicle: Vehicle = {
  licensePlate: '123421',
  user: new User(mockInputParams),
  vehicleType: mockVehicleType,
};

describe('User Unit Tests', () => {
  it('should create a new User', () => {
    const user = new User(mockInputParams);
    expect(user).toEqual(mockInputParams);
  });

  it('should add a new vehicle to the user', () => {
    const user = new User(mockInputParams);
    user.addVehicle(mockInputParams, mockVehicleType);

    expect(user.addVehicle(mockInputParams, mockVehicleType)).toEqual(
      mockOutputVehicle,
    );
  });
});
