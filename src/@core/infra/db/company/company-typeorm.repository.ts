import { Company } from '../../../../@core/domain/entity/company/company';
import { CompanyRepository } from '../../../../@core/domain/repository/company/company.repository';
import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
import { Repository } from 'typeorm';
import { CompanySchema } from './company.schema';
import { UpdateCompanyDto } from '../../../../company/dto/update-company.dto';

export class CompanyTypeormRepository implements CompanyRepository {
  constructor(private ormRepository: Repository<CompanySchema>) {}
  async findAll(): Promise<Company[]> {
    const model: Company[] = await this.ormRepository.find();
    return model;
  }

  async update(
    cnpj: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      cnpj: cnpj,
    });
    const company: UpdateCompanyDto = {
      id: model.id,
      ...updateCompanyDto,
    };
    await this.ormRepository.save(company);
  }

  async delete(cnpj: string): Promise<void> {
    const model = await this.ormRepository.findOneBy({
      cnpj: cnpj,
    });
    await this.ormRepository.delete(model.id);
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const model = await this.ormRepository.findOneBy({
      cnpj: cnpj,
    });
    if (!model) {
      return null;
    }
    const company: CreateCompanyDto = {
      address: model.address,
      carSpaces: model.carSpaces,
      id: model.id,
      cnpj: model.cnpj,
      motorCycleSpaces: model.motorCycleSpaces,
      name: model.name,
      telephone: model.telephone,
    };
    return new Company(company);
  }

  async insert(company: Company): Promise<void> {
    const model = this.ormRepository.create(company);
    await this.ormRepository.insert(model);
  }
}
