import { Company } from '../../entity/company/company';

export interface CompanyRepository {
  insert(company: Company): Promise<void>;
}
