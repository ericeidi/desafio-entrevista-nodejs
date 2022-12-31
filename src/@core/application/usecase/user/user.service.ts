import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../../@core/domain/repository/user/user.repository';
import { VehicleTypeRepository } from '../../../../@core/domain/repository/vehicle-type/vehicle-type.repository';
import { VehicleRepository } from '../../../../@core/domain/repository/vehicle/vehicle.repository';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../../../user/dto/update-user.dto';
import { User } from '../../../domain/entity/user/user';

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly vehicleTypeRepository: VehicleTypeRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    const savedUser = await this.userRepository.insert(user);
    user.id = savedUser.id;
    const verifyLicensePlate = await this.vehicleRepository.findByLicensePlate(
      createUserDto.licensePlate,
    );
    if (verifyLicensePlate.length !== 0) {
      throw new BadRequestException('Placa já utilizada');
    }
    const vehicleType = await this.vehicleTypeRepository.findByType(
      createUserDto.vehicleTypeId,
    );
    const vehicle = user.addVehicle(createUserDto, vehicleType);
    await this.vehicleRepository.insert(vehicle);

    return savedUser;
  }

  async findAll() {
    const user = await this.userRepository.findAll();
    if (!user) {
      throw new NotFoundException(
        'Não foi encontrado nenhum resultado para essa busca',
      );
    }
    return user;
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(
        'Não foi encontrado nenhum resultado para essa busca',
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, updateUserDto);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao realizar atualização do usuario',
        e,
      );
    }
  }
  async delete(id: number) {
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao deletar tipo de veiculo na base de dados',
        e,
      );
    }
  }
}
