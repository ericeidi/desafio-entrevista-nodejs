import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '../../../../@core/domain/entity/company/company';
import { CompanyRepository } from '../../../../@core/domain/repository/company/company.repository';
import { CreateCompanyDto } from '../../../../company/dto/create-company.dto';
import { UpdateCompanyDto } from '../../../../company/dto/update-company.dto';

export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = new Company(createCompanyDto);
    const verifyExistantCompany = await this.companyRepository.findByCnpj(
      company.cnpj,
    );
    if (!verifyExistantCompany) {
      await this.companyRepository.insert(company);
      return company;
    }
    throw new BadRequestException('Estabelecimento já existente');
  }

  async findAll() {
    const company = await this.companyRepository.findAll();
    if (!company) {
      throw new NotFoundException(
        'Não foi encontrado nenhum resultado para essa busca',
      );
    }
    return company;
  }

  async findByCnpj(cnpj: string) {
    const company = await this.companyRepository.findByCnpj(cnpj);
    if (!company) {
      throw new NotFoundException(
        'Não foi encontrado nenhum resultado para essa busca',
      );
    }
    return company;
  }

  async update(cnpj: string, updateCompany: UpdateCompanyDto) {
    try {
      await this.companyRepository.update(cnpj, updateCompany);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao realizar atualização do estabelecimento',
        e,
      );
    }
  }
  async delete(cnpj: string) {
    try {
      await this.companyRepository.delete(cnpj);
    } catch (e) {
      throw new InternalServerErrorException(
        'Falha ao deletar estabelecimento na base de dados',
        e,
      );
    }
  }
}
