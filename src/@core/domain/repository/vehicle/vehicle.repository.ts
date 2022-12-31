import { Vehicle } from '../../entity/vehicle/vehicle';

export interface VehicleRepository {
  insert(vehicles: Vehicle): Promise<Vehicle>;
}
