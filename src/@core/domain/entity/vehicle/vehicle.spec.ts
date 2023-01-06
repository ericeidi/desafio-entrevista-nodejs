import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from '../user/user';
import { VehicleType } from '../vehicle-type/vehicle-type';
import { Vehicle } from './vehicle';

const mockVehicleType: VehicleType = {
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

const mockInput: Vehicle = {
  licensePlate: '123421',
  user: new User(mockUser),
  vehicleType: mockVehicleType,
};

describe('Vehicle Unit Tests', () => {
  it('should create a new Vehicle', () => {
    const vehicle = new Vehicle(
      mockInput.licensePlate,
      mockInput.user,
      mockInput.vehicleType,
    );
    expect(vehicle).toEqual(vehicle);
  });
});
