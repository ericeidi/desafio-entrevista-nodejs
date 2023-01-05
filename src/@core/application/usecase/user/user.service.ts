import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../../@core/domain/repository/user/user.repository';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../../../user/dto/update-user.dto';
import { User } from '../../../domain/entity/user/user';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    const userAlreadyExists = await this.userRepository.findByUsername(
      user.name,
    );
    if (userAlreadyExists) {
      throw new BadRequestException('Usuário já existe');
    }
    await this.userRepository.insert(user);
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

  async findByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);
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
