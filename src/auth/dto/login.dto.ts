import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'joao123', description: 'The username' })
  @IsString()
  username: string;
  @ApiProperty({ example: '421424421', description: 'The password' })
  @IsString()
  password: string;
}
