import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParkingLotReservationService } from 'src/@core/application/usecase/parking-lot-reservation/parking-lot-reservation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateParkingReservationDto } from 'src/parking-lot-reservation/dto/create-parking-reservation.dto';
import { UpdateParkingReservationDto } from 'src/parking-lot-reservation/dto/update-parking-reservation.dto';
import { FindReservationByCompanyDto } from './dto/find-reservation-company.dto';
import { FindDepartQuantityReservationDto } from './dto/find-arrival-reservation-quantity.dto';
import { FindArrivalQuantityReservationDto } from './dto/find-depart-reservation-quantity.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Parking Lot Reservation')
@Controller('parking-lot-reservation')
export class ParkingLotReservationController {
  constructor(
    private readonly parkingLotReservationService: ParkingLotReservationService,
  ) {}
  @Post('start-reservation')
  @ApiOperation({ summary: 'start new reservation' })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: created new reservation for selected car license plate',
  })
  @ApiResponse({
    status: 400,
    description:
      'Expected response: there is already a reservation for selected board',
  })
  createReservation(
    @Body() createParkingReservationDto: CreateParkingReservationDto,
  ) {
    this.parkingLotReservationService.startReservation(
      createParkingReservationDto,
    );
  }

  @Patch('finish-reservation')
  @ApiOperation({ summary: 'finish a reservation' })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: finished reservation for selected car license plate',
  })
  @ApiResponse({
    status: 400,
    description: 'Expected response: reservation is already finalized',
  })
  finishReservation(
    @Body() updateParkingReservationDto: UpdateParkingReservationDto,
  ) {
    return this.parkingLotReservationService.finishReservation(
      updateParkingReservationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'find all reservations' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: reservation listing',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findAll() {
    return this.parkingLotReservationService.findAllReservations();
  }

  @Get('find-reservation-by-company')
  @ApiOperation({ summary: 'find reservation by property' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: reservation list by company',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findByCompany(@Query() query: FindReservationByCompanyDto) {
    return this.parkingLotReservationService.findReservationByCompany(
      query.companyId,
    );
  }

  @Get('find-arrival-quantity-by-hour')
  @ApiOperation({
    summary: 'find amount of vehicle input per input time',
  })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: List of vehicle entry quantity by entry time',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findArrivalReservationQuantityByHour(
    @Query() query: FindArrivalQuantityReservationDto,
  ) {
    return this.parkingLotReservationService.findArrivalReservationQuantityByHour(
      query,
    );
  }

  @Get('find-depart-quantity-by-hour')
  @ApiOperation({
    summary: 'find quantity of incoming vehicles per departure time',
  })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: list of vehicle entry quantity by departure time',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findDepartReservationQuantityByHour(
    @Query() query: FindDepartQuantityReservationDto,
  ) {
    return this.parkingLotReservationService.findDepartReservationQuantityByHour(
      query,
    );
  }
}
