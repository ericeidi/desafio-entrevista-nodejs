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
  @ApiOperation({ summary: 'create a vehicle for a user' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: created new vehicle',
  })
  @ApiResponse({
    status: 400,
    description: 'Expected response: existing plate or user',
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'search all vehicles' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: return vehicles from the system',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'find vehicle by id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: return vehicle by id',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findById(@Param('id') id: string) {
    return this.vehicleService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update vehicle by id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: veículo atualizado',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete vehicle by id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: veículo deletado',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  delete(@Param('id') id: string) {
    return this.vehicleService.delete(+id);
  }
}
