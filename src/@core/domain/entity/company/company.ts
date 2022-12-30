import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
export class Company {
  name: string;
  cnpj: string;
  address: string;
  telephone: string;
  carSpaces: number;
  motorCycleSpaces: number;

  constructor({
    cnpj,
    name,
    address,
    telephone,
    carSpaces,
    motorCycleSpaces,
  }: CreateCompanyDto) {
    this.cnpj = cnpj;
    this.name = name;
    this.address = address;
    this.telephone = telephone;
    this.carSpaces = carSpaces;
    this.motorCycleSpaces = motorCycleSpaces;
  }
}
