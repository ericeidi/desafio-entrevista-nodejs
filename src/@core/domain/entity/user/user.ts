import { CreateUserDto } from '../../../../user/dto/create-user.dto';

export class User {
  id?: number;
  email: string;
  password: string;
  username: string;
  name: string;

  constructor(createUserDto: CreateUserDto) {
    this.id = createUserDto.id || null;
    this.email = createUserDto.email;
    this.username = createUserDto.username;
    this.password = createUserDto.password;
    this.name = createUserDto.name;
  }
}
