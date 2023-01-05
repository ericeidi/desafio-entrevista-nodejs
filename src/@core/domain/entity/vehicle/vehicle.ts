import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from '../user/user';
import { VehicleType } from '../vehicle-type/vehicle-type';

export class Vehicle {
  id?: number;
  licensePlate: string;
  user: User;
  vehicleType: VehicleType;
  constructor(licensePlate: string, user: User, vehicleType: VehicleType) {
    this.licensePlate = licensePlate;
    this.user = user;
    this.vehicleType = vehicleType;
  }

  // addVehicle?(createUserDto: CreateUserDto, vehicleType: VehicleType) {
  //   const vehicle = new Vehicle(createUserDto.licensePlate, this, vehicleType);
  //   return vehicle;
  // }
}
