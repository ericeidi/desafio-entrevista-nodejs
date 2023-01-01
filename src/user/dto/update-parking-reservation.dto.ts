import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateParkingReservationDto {
  @IsString()
  @ApiProperty({ example: '123-abc', description: 'The license plate' })
  licensePlate: string;
}
