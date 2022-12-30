import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyService } from 'src/@core/application/usecase/company/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':cnpj')
  findByCnpj(@Param('cnpj') cnpj: string) {
    return this.companyService.findByCnpj(cnpj);
  }

  @Patch(':cnpj')
  update(
    @Param('cnpj') cnpj: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(cnpj, updateCompanyDto);
  }

  @Delete(':cnpj')
  delete(@Param('cnpj') cnpj: string) {
    return this.companyService.delete(cnpj);
  }
}
