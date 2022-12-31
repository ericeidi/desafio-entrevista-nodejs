import { Vehicle } from 'src/@core/domain/entity/vehicle/vehicle';
import { VehicleRepository } from 'src/@core/domain/repository/vehicle/vehicle.repository';
import { Repository } from 'typeorm';
import { VehicleSchema } from './vehicle.schema';

export class VehicleTypeormRepository implements VehicleRepository {
  constructor(private ormRepository: Repository<VehicleSchema>) {}
  async insert(vehicles: Vehicle): Promise<Vehicle> {
    const model = this.ormRepository.create(vehicles);
    await this.ormRepository.insert(model);

    const vehicle: Vehicle = {
      licensePlate: model.licensePlate,
      user: model.user,
      vehicleType: model.vehicleType,
    };
    return vehicle;
  }
}
