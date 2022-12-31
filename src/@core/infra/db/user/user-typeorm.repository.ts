import { UserRepository } from 'src/@core/domain/repository/user/user.repository';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entity/user/user';
import { UserSchema } from './user.schema';

export class UserTypeormRepository implements UserRepository {
  constructor(private ormRepository: Repository<UserSchema>) {}
  async findByUsername(username: string): Promise<any | null> {
    const model = await this.ormRepository.findOneBy({
      name: username,
    });
    if (!model) {
      return null;
    }
    const user = {
      id: model.id,
      name: model.name,
      password: model.password,
      email: model.email,
    };
    return user;
  }
  async findAll(): Promise<UserSchema[]> {
    const model = await this.ormRepository.find();
    return model;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    const User: UpdateUserDto = {
      id: model.id,
      ...updateUserDto,
    };
    await this.ormRepository.save(User);
  }

  async delete(id: number): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    await this.ormRepository.delete(model);
  }

  async findById(id: number): Promise<any | null> {
    const model = await this.ormRepository.findOneBy({
      id: id,
    });
    if (!model) {
      return null;
    }
    const user = {
      id: model.id,
      name: model.name,
      email: model.email,
    };
    return user;
  }

  async insert(user: User): Promise<User> {
    const model: User = this.ormRepository.create(user);
    await this.ormRepository.insert(model);
    return model;
  }
}
