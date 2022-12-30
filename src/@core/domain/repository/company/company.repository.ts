import { Company } from '../../entity/company/company';
import { UpdateCompanyDto } from '../../../../company/dto/update-company.dto';

export interface CompanyRepository {
  insert(company: Company): Promise<void>;
  findAll(): Promise<Company[]>;
  findByCnpj(id: string): Promise<Company>;
  update(cnpj: string, updateCompanyDto: UpdateCompanyDto): Promise<void>;
  delete(cnpj: string): Promise<void>;
}
