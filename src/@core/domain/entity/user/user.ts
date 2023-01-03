import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { VehicleType } from '../vehicle-type/vehicle-type';
import { Vehicle } from '../vehicle/vehicle';

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

  async hashPassword?(): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltOrRounds);
    return hashedPassword;
  }

  addVehicle?(createUserDto: CreateUserDto, vehicleType: VehicleType) {
    const vehicle = new Vehicle(createUserDto.licensePlate, this, vehicleType);
    return vehicle;
  }
}
