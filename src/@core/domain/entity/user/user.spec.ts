import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from './User';

const mockInputParams: CreateUserDto = {
  id: null,
  name: 'joao',
  email: 'joao@gmail.com',
  password: '123',
};

describe('User Unit Tests', () => {
  it('should create a new User', () => {
    const user = new User(mockInputParams);
    expect(user).toEqual(mockInputParams);
  });
});
