import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  id?: number;
  @ApiProperty({ example: 'joao123', description: 'The username' })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'joao123',
    description: 'The username',
  })
  @IsString()
  username: string;
  @ApiProperty({
    example: 'teste@teste.com',
    description: 'The email',
  })
  @IsString()
  email: string;
  @ApiProperty({ example: '123456', description: 'the password' })
  password: string;
}
