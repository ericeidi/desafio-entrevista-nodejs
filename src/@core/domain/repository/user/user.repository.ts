import { UserSchema } from 'src/@core/infra/db/user/user.schema';
import { UpdateUserDto } from '../../../../user/dto/update-user.dto';
import { User } from '../../entity/user/user';
export interface UserRepository {
  insert(user: User): Promise<User>;
  findAll(): Promise<UserSchema[]>;
  findById(id: number): Promise<User>;
  findByUsername(name: string): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
  delete(id: number): Promise<void>;
}
