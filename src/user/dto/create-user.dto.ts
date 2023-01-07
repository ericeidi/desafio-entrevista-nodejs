import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id?: number;
  @ApiProperty({
    example: 'joao123',
    description: 'The name',
    required: true,
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'joao123',
    description: 'The username',
    required: true,
  })
  @IsEmail()
  @IsString()
  username: string;
  @ApiProperty({
    example: 'teste@teste.com',
    description: 'The email',
    required: true,
  })
  @IsString()
  email: string;
  @ApiProperty({
    example: '123456',
    minLength: 6,
    maxLength: 8,
    description: 'the password',
    required: true,
  })
  password: string;
}
