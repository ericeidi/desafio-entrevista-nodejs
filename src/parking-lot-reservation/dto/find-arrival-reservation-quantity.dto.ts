import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindDepartQuantityReservationDto {
  @IsString()
  @ApiProperty({ example: '2022-01-01', description: 'The date in US format' })
  date: string;
  @IsString()
  @ApiProperty({ example: '18', description: 'The hours in military format' })
  startHour: string;
  @IsString()
  @ApiProperty({ example: '19', description: 'The hours in military format' })
  endHour: string;
}
