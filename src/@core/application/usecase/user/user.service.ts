import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { hashPassword } from '../../../../shared/utils/hash-password';
import { UserRepository } from '../../../../@core/domain/repository/user/user.repository';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../../../user/dto/update-user.dto';
import { User } from '../../../domain/entity/user/user';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User(createUserDto);
      user.password = await hashPassword(user.password);
      const userAlreadyExists = await this.userRepository.findByUsername(
        user.username,
      );
      if (userAlreadyExists) {
        throw new ConflictException('Usuário já existe');
      }
      return await this.userRepository.insert(user);
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    try {
      const user = await this.userRepository.findAll();
      if (!user) {
        throw new NotFoundException(
          'Não foi encontrado nenhum resultado para essa busca',
        );
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  async findById(id: number) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new NotFoundException(
          'Não foi encontrado nenhum resultado para essa busca',
        );
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (!user) {
        throw new NotFoundException(
          'Não foi encontrado nenhum resultado para essa busca',
        );
      }
      return user;
    } catch (e) {
      throw e;
    }
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
