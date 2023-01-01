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
  @ApiOperation({ summary: 'Criar novo estabelecimento' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: Criado novo estabelecimento.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao criar estabelecimento.',
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Encontrar todos estabelecimentos' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Listagem de estabelecimentos.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao listar estabelecimentos.',
  })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':cnpj')
  @ApiOperation({ summary: 'Encontrar um estabelecimento' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Listagem de um estabelecimento.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao listar um estabelecimento.',
  })
  findByCnpj(@Param('cnpj') cnpj: string) {
    return this.companyService.findByCnpj(cnpj);
  }

  @Patch(':cnpj')
  @ApiOperation({ summary: 'Atualizar estabelecimento' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Estabelecimento atualizado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao atualizar estabelecimento.',
  })
  update(
    @Param('cnpj') cnpj: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(cnpj, updateCompanyDto);
  }

  @Delete(':cnpj')
  @ApiOperation({ summary: 'Deletar um estabelecimento' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Estabelecimento deletado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao deletar estabelecimento.',
  })
  delete(@Param('cnpj') cnpj: string) {
    return this.companyService.delete(cnpj);
  }
}
