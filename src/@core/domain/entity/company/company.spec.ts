import { Company } from './company';

describe('Company Unit Tests', () => {
  it('should create a new company', () => {
    const company = new Company('Dr.consulta', '483212344324324');
    expect(company.name).toBe('Dr.consulta');
    expect(company.cnpj).toBe('483212344324324');
  });
});
