import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
import { Company } from './company';

const mockInputParams: CreateCompanyDto = {
  id: null,
  name: 'Dr.Consulta',
  cnpj: '483212344324324',
  address: 'Rua Das Flores',
  telephone: '12324212342',
  carSpaces: 53,
  motorCycleSpaces: 43,
};

describe('Company Unit Tests', () => {
  it('should create a new company', () => {
    const company = new Company(mockInputParams);
    expect(company).toEqual(mockInputParams);
  });
});
