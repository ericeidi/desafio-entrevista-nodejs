import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  id?: number;
  @ApiProperty({ example: 'joao123', description: 'The username' })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'teste@teste.com',
    description: 'The age of the Cat',
  })
  @IsString()
  email: string;
  @ApiProperty({ example: '123456', description: 'the password' })
  password: string;
  @ApiProperty({
    example: 1,
    description: 'Vehicle type: 1=Car - 2=motorcycle',
  })
  @IsInt()
  vehicleTypeId: number;
  @ApiProperty({ example: '123-abc', description: 'The license plate' })
  @IsString()
  licensePlate: string;
}
