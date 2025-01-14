import { VehicleType } from '../../../../@core/domain/entity/vehicle-type/vehicle-type';
import { VehicleTypeRepository } from '../../../../@core/domain/repository/vehicle-type/vehicle-type.repository';
import { CreateVehicleTypeDto } from '../../../../vehicle-type/dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from '../../../../vehicle-type/dto/update-vehicle-type.dto';
import { Repository } from 'typeorm';
import { VehicleTypeSchema } from 'src/@core/infra/db/vehicle-type/vehicle-type.schema';

export class VehicleTypeTypeormRepository implements VehicleTypeRepository {
  constructor(private ormRepository: Repository<VehicleTypeSchema>) {}
  async findByType(typeId: number): Promise<VehicleType> {
    const model = await this.ormRepository.findOneBy({
      type: typeId,
    });
    if (!model) {
      return null;
    }
    const vehicleType: CreateVehicleTypeDto = {
      id: model.id,
      brand: model.brand,
      model: model.model,
      color: model.color,
      type: model.type,
    };
    return new VehicleType(vehicleType);
  }
  async findAll(): Promise<VehicleType[]> {
    const model: VehicleType[] = await this.ormRepository.find();
    return model;
  }

  async update(
    id: number,
    updateVehicleTypeDto: UpdateVehicleTypeDto,
  ): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    const vehicleType: UpdateVehicleTypeDto = {
      id: model.id,
      ...updateVehicleTypeDto,
    };
    await this.ormRepository.save(vehicleType);
  }

  async delete(id: number): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    await this.ormRepository.delete(model.id);
  }

  async findById(id: number): Promise<VehicleType | null> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    if (!model) {
      return null;
    }
    const vehicleType: CreateVehicleTypeDto = {
      id: model.id,
      brand: model.brand,
      model: model.model,
      color: model.color,
      type: model.type,
    };
    return new VehicleType(vehicleType);
  }

  async insert(vehicleType: VehicleType): Promise<void> {
    const model = this.ormRepository.create(vehicleType);
    await this.ormRepository.insert(model);
  }
}
