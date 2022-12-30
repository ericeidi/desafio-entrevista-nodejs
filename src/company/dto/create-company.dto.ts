export class CreateCompanyDto {
  id?: number;
  name: string;
  cnpj: string;
  address: string;
  telephone: string;
  carSpaces: number;
  motorCycleSpaces: number;
}
