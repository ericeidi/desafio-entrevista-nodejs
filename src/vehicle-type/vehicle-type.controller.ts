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
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { VehicleTypeService } from 'src/@core/application/usecase/vehicle-type/vehicle-type.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Vehicle Type')
@UseGuards(JwtAuthGuard)
@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo tipo de veiculo' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: Criado novo tipo de veiculo.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao criar tipo de veiculo.',
  })
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar tipos de veiculos' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: listagem de todos os tipos de veículos.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Expected response: falha ao buscar lista de tipos de veiculos.',
  })
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tipo de veiculo por id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Retornar tipo de veiculo por id.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar tipo de veiculo por id.',
  })
  findById(@Param('id') id: string) {
    return this.vehicleTypeService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um tipo de veiculo' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Tipo de veiculo atualizado com sucesso.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Expected response: falha ao buscar lista de tipos de veiculos.',
  })
  update(
    @Param('id') id: string,
    @Body() updateVehicleTypeDto: UpdateVehicleTypeDto,
  ) {
    return this.vehicleTypeService.update(+id, updateVehicleTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um tipo de veiculo' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Tipo de veiculo deletado.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Expected response: falha ao deletar tipo de veiculo deletado.',
  })
  delete(@Param('id') id: string) {
    return this.vehicleTypeService.delete(+id);
  }
}
