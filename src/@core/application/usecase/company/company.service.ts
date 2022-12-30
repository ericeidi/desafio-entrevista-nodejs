import { Company } from 'src/@core/domain/entity/company/company';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';

export class CompanyService {
  //Application Service
  constructor(private companyRepository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = new Company(createCompanyDto.name, createCompanyDto.cnpj);
    await this.companyRepository.insert(company);
    return company;
  }
}
