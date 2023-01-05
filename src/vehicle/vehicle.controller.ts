import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VehicleService } from 'src/@core/application/usecase/vehicle/vehicle.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@ApiTags('Vehicle')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}
  @Post()
  @ApiOperation({ summary: 'Criar um veiculo para um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: criado novo veículo.',
  })
  @ApiResponse({
    status: 400,
    description: 'Expected response: placa ou usuário já existente.',
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos veículos' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Retornar veículos do sistema.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar veículo por id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Retornar veículo por id.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  findById(@Param('id') id: string) {
    return this.vehicleService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar veículo por id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: veículo atualizado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar veículo por id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: veículo deletado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  delete(@Param('id') id: string) {
    return this.vehicleService.delete(+id);
  }
}
