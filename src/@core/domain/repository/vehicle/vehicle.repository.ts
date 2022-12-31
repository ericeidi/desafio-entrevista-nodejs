import { Vehicle } from '../../entity/vehicle/vehicle';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';

export interface VehicleRepository {
  insert(vehicles: Vehicle): Promise<Vehicle>;
  findByLicensePlate(licensePlate: string): Promise<VehicleSchema[]>;
}
