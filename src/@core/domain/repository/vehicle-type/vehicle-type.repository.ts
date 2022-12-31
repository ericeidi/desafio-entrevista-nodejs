import { VehicleType } from '../../entity/vehicle-type/vehicle-type';
import { UpdateVehicleTypeDto } from '../../../../vehicle-type/dto/update-vehicle-type.dto';
export interface VehicleTypeRepository {
  insert(vehicleType: VehicleType): Promise<void>;
  findAll(): Promise<VehicleType[]>;
  findById(id: number): Promise<VehicleType>;
  findByType(typeId: number): Promise<VehicleType>;
  update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto): Promise<void>;
  delete(id: number): Promise<void>;
}
