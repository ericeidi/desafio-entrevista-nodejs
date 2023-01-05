import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @ApiProperty({ example: '123-abc', description: 'The license plate' })
  licensePlate: string;
  @IsString()
  @ApiProperty({ example: '1', description: 'The user id' })
  userId: number;
  @ApiProperty({ example: '1', description: 'The vehicle type id' })
  vehicleTypeId: number;
}
