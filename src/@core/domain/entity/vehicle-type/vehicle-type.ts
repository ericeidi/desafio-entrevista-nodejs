import { CreateVehicleTypeDto } from '../../../../vehicle-type/dto/create-vehicle-type.dto';
export class VehicleType {
  id?: number;
  brand: string;
  model: string;
  type: number;
  color: string;

  constructor(createVehicleTypeDto: CreateVehicleTypeDto) {
    this.brand = createVehicleTypeDto.brand;
    this.color = createVehicleTypeDto.color;
    this.model = createVehicleTypeDto.model;
    this.type = createVehicleTypeDto.type;
    this.id = createVehicleTypeDto.id || null;
  }
}
