import { Company } from 'src/@core/domain/entity/company/company';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { Repository } from 'typeorm';
import { CompanySchema } from './company.schema';

export class CompanyTypeormRepository implements CompanyRepository {
  constructor(private ormRepo: Repository<CompanySchema>) {}
  async insert(company: Company): Promise<void> {
    const model = this.ormRepo.create(company);
    await this.ormRepo.insert(model);
  }
}
