import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
export class Company {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  telephone: string;
  carSpaces: number;
  motorCycleSpaces: number;

  constructor({
    id,
    cnpj,
    name,
    address,
    telephone,
    carSpaces,
    motorCycleSpaces,
  }: CreateCompanyDto) {
    this.id = id || null;
    this.cnpj = cnpj;
    this.name = name;
    this.address = address;
    this.telephone = telephone;
    this.carSpaces = carSpaces;
    this.motorCycleSpaces = motorCycleSpaces;
  }
}
