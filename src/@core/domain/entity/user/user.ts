import { v4 as uuid } from 'uuid';
import { Vehicle } from '../vehicle/vehicle';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { VehicleType } from '../vehicle-type/vehicle-type';

export class User {
  id?: number;
  email: string;
  password: string;
  name: string;
  vehicles?: Vehicle[];

  constructor(createUserDto: CreateUserDto) {
    this.id = createUserDto.id || null;
    this.email = createUserDto.email;
    this.password = createUserDto.password;
    this.name = createUserDto.name;
  }

  addVehicle?(createUserDto: CreateUserDto, vehicleType: VehicleType) {
    const vehicle = new Vehicle(createUserDto.licensePlate, this, vehicleType);
    return vehicle;
  }
}
