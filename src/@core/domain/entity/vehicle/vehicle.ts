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
}
