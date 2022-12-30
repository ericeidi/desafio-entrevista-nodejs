import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyServiceNest } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyService } from 'src/@core/application/usecase/company/company.service';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyServiceNest: CompanyServiceNest,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyServiceNest.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyServiceNest.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyServiceNest.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyServiceNest.remove(+id);
  }
}
