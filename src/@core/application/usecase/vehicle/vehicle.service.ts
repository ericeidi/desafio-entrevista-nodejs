import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Vehicle } from 'src/@core/domain/entity/vehicle/vehicle';
import { UserRepository } from 'src/@core/domain/repository/user/user.repository';
import { VehicleTypeRepository } from 'src/@core/domain/repository/vehicle-type/vehicle-type.repository';
import { VehicleRepository } from 'src/@core/domain/repository/vehicle/vehicle.repository';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/vehicle/dto/update-vehicle.dto';

export class VehicleService {
  constructor(
    private vehicleRepository: VehicleRepository,
    private vehicleTypeRepository: VehicleTypeRepository,
    private userRepository: UserRepository,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const verifyLicensePlate = await this.vehicleRepository.findByLicensePlate(
      createVehicleDto.licensePlate,
    );
    if (verifyLicensePlate.length !== 0) {
      throw new BadRequestException('Placa já utilizada');
    }

    const vehicleType = await this.vehicleTypeRepository.findByType(
      createVehicleDto.vehicleTypeId,
    );
    if (!vehicleType) {
      throw new BadRequestException('Tipo de veiculo inexistente');
    }

    const user = await this.userRepository.findById(createVehicleDto.userId);
    if (!user) {
      throw new BadRequestException('Usuário inexistente');
    }

    const createdVehicle = new Vehicle(
      createVehicleDto.licensePlate,
      user,
      vehicleType,
    );
    await this.vehicleRepository.insert(createdVehicle);
  }

  async findAll() {
    const vehicle = await this.vehicleRepository.findAll();
    if (!vehicle) {
      throw new NotFoundException(
        'Não foi encontrado nenhum resultado para essa busca',
      );
    }
    return vehicle;
  }

  async findById(id: number) {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new NotFoundException(
        'Não foi encontrado nenhum resultado para essa busca',
      );
    }
    return vehicle;
  }

  async update(id: number, updateUserDto: UpdateVehicleDto) {
    try {
      await this.vehicleRepository.update(id, updateUserDto);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao realizar atualização do usuario',
        e,
      );
    }
  }
  async delete(id: number) {
    try {
      await this.vehicleRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao deletar veiculo na base de dados',
        e,
      );
    }
  }
}
