import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateParkingReservationDto {
  @IsString()
  @ApiProperty({ example: '123-abc', description: 'The license plate' })
  licensePlate: string;
  @IsString()
  @ApiProperty({ example: '12332142142312', description: 'The company Cnpj' })
  cnpj: string;
}
