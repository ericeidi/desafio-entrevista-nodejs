import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VehicleType } from '../../../../@core/domain/entity/vehicle-type/vehicle-type';
import { CreateVehicleTypeDto } from '../../../../vehicle-type/dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from '../../../../vehicle-type/dto/update-vehicle-type.dto';
import { VehicleTypeRepository } from '../../../domain/repository/vehicle-type/vehicle-type.repository';

export class VehicleTypeService {
  constructor(private vehicleTypeRepository: VehicleTypeRepository) {}

  async create(createVehicleTypeDto: CreateVehicleTypeDto) {
    try {
      const vehicleType = new VehicleType(createVehicleTypeDto);
      await this.vehicleTypeRepository.insert(vehicleType);
      return vehicleType;
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    try {
      const vehicleType = await this.vehicleTypeRepository.findAll();
      if (!vehicleType) {
        throw new NotFoundException(
          'Não foi encontrado nenhum resultado para essa busca',
        );
      }
      return vehicleType;
    } catch (e) {
      throw e;
    }
  }

  async findById(id: number) {
    try {
      const vehicleType = await this.vehicleTypeRepository.findById(id);
      if (!vehicleType) {
        throw new NotFoundException(
          'Não foi encontrado nenhum resultado para essa busca',
        );
      }
      return vehicleType;
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto) {
    try {
      await this.vehicleTypeRepository.update(id, updateVehicleTypeDto);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao realizar atualização do tipo de veiculo',
        e,
      );
    }
  }
  async delete(id: number) {
    try {
      await this.vehicleTypeRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao deletar tipo de veiculo na base de dados',
        e,
      );
    }
  }
}
