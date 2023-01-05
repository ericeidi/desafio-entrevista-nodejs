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
  @ApiOperation({ summary: 'create new vehicle type' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: created new vehicle type',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to post data',
  })
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'search vehicle types' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: list of all types of vehicles',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'search vehicle type by id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: return vehicle type by id',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findById(@Param('id') id: string) {
    return this.vehicleTypeService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a vehicle type' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: vehicle type updated successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to patch data',
  })
  update(
    @Param('id') id: string,
    @Body() updateVehicleTypeDto: UpdateVehicleTypeDto,
  ) {
    return this.vehicleTypeService.update(+id, updateVehicleTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a vehicle type' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: deleted vehicle type',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  delete(@Param('id') id: string) {
    return this.vehicleTypeService.delete(+id);
  }
}
