import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateCompanyDto {
  id?: number;
  @ApiProperty({ example: 'Dr. consulta', description: 'The company name' })
  @IsString()
  name: string;
  @ApiProperty({ example: '12345678910111', description: 'The cnpj' })
  @IsString()
  cnpj: string;
  @ApiProperty({ example: 'Rua 13', description: 'The adress' })
  @IsString()
  address: string;
  @ApiProperty({ example: '99999999', description: 'The telephone' })
  @IsString()
  telephone: string;
  @ApiProperty({ example: '50', description: 'The car space' })
  @IsInt()
  carSpaces: number;
  @ApiProperty({ example: '50', description: 'The motorcycle space' })
  @IsInt()
  motorCycleSpaces: number;
}
