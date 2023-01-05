import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyService } from 'src/@core/application/usecase/company/company.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Company')
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'create new company' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: created new company',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to create company',
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'find all companies' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: list of companies',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to list companies',
  })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':cnpj')
  @ApiOperation({ summary: 'find an company' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: list of a company',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to list an company',
  })
  findByCnpj(@Param('cnpj') cnpj: string) {
    return this.companyService.findByCnpj(cnpj);
  }

  @Patch(':cnpj')
  @ApiOperation({ summary: 'update company' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: updated company',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to update property',
  })
  update(
    @Param('cnpj') cnpj: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(cnpj, updateCompanyDto);
  }

  @Delete(':cnpj')
  @ApiOperation({ summary: 'delete an company' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: company deleted',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to delete company',
  })
  delete(@Param('cnpj') cnpj: string) {
    return this.companyService.delete(cnpj);
  }
}
