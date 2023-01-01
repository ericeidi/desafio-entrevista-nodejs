import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateVehicleTypeDto {
  id?: number;
  @ApiProperty({ example: 'toyota', description: 'The brand' })
  @IsString()
  brand: string;
  @ApiProperty({ example: 'corolla', description: 'The model' })
  @IsString()
  model: string;
  @ApiProperty({ example: 'silver', description: 'The color' })
  @IsString()
  color: string;
  @ApiProperty({
    example: '1',
    description: 'The Vehicle Type 1=car - 2=motorcycle',
  })
  @IsInt()
  type: number;
}
