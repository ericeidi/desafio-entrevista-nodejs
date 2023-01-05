import { Vehicle } from 'src/@core/domain/entity/vehicle/vehicle';
import { VehicleRepository } from 'src/@core/domain/repository/vehicle/vehicle.repository';
import { Repository } from 'typeorm';
import { VehicleSchema } from './vehicle.schema';
import { UpdateVehicleDto } from '../../../../vehicle/dto/update-vehicle.dto';

export class VehicleTypeormRepository implements VehicleRepository {
  constructor(private ormRepository: Repository<VehicleSchema>) {}
  async findByLicensePlate(licensePlate: string): Promise<VehicleSchema[]> {
    const responseVehicle = await this.ormRepository.find({
      relations: {
        user: true,
        vehicleType: true,
      },
      where: {
        licensePlate: licensePlate,
      },
    });
    return responseVehicle;
  }

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

  async findAll(): Promise<Vehicle[]> {
    const model = await this.ormRepository.find();
    return model;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    const vehicle = {
      id: model.id,
      ...updateVehicleDto,
    };
    await this.ormRepository.save(vehicle);
  }

  async delete(id: number): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    await this.ormRepository.delete(model);
  }

  async findById(id: number): Promise<Vehicle | null> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    if (!model) {
      return null;
    }
    return model;
  }
}
