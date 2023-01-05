import { Vehicle } from '../../entity/vehicle/vehicle';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';
import { UpdateVehicleDto } from '../../../../vehicle/dto/update-vehicle.dto';

export interface VehicleRepository {
  insert(vehicles: Vehicle): Promise<Vehicle>;
  findByLicensePlate(licensePlate: string): Promise<VehicleSchema[]>;
  findAll(): Promise<Vehicle[]>;
  findById(id: number): Promise<Vehicle>;
  update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<void>;
  delete(id: number): Promise<void>;
}
