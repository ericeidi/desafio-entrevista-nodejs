import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindReservationByCompanyDto {
  @IsString()
  @ApiProperty({ example: '5', description: 'The company id' })
  companyId: number;
}
