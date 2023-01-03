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
import { CreateParkingReservationDto } from 'src/user/dto/create-parking-reservation.dto';
import { UpdateParkingReservationDto } from 'src/user/dto/update-parking-reservation.dto';
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
  @ApiOperation({ summary: 'Começar nova reserva' })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: criado nova reserva para placa do carro selecionado.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Expected response: Já existe uma reserva para placa selecionada.',
  })
  createReservation(
    @Body() createParkingReservationDto: CreateParkingReservationDto,
  ) {
    this.parkingLotReservationService.startReservation(
      createParkingReservationDto,
    );
  }

  @Patch('finish-reservation')
  @ApiOperation({ summary: 'Finalizar uma reserva' })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: finalizado reserva para placa do carro selecionado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Expected response: Reserva já está finalizada.',
  })
  finishReservation(
    @Body() updateParkingReservationDto: UpdateParkingReservationDto,
  ) {
    return this.parkingLotReservationService.finishReservation(
      updateParkingReservationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Encontrar todas as reservas' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Listagem de reservas.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao encontrar reservas.',
  })
  findAll() {
    return this.parkingLotReservationService.findAllReservations();
  }

  @Get('find-reservation-by-company')
  @ApiOperation({ summary: 'Encontrar reserva por estabelecimento.' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Listagem de reserva por estabelecimento.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Expected response: Falha ao encontrar reserva por estabelecimento.',
  })
  findByCompany(@Query() query: FindReservationByCompanyDto) {
    return this.parkingLotReservationService.findReservationByCompany(
      query.companyId,
    );
  }

  @Get('find-arrival-quantity-by-hour')
  @ApiOperation({
    summary: 'Encontrar quantidade de entrada de veiculos por hora de entrada.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: Listagem de quantidade de entrada de veiculos por hora de entrada.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Expected response: Falha ao encontrar quantidade de entrada de veiculos por hora de entrada.',
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
    summary: 'Encontrar quantidade de entrada de veiculos por hora de saida.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Expected response: Listagem de quantidade de entrada de veiculos por hora de saida.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Expected response: Falha ao encontrar quantidade de entrada de veiculos por hora de saida.',
  })
  findDepartReservationQuantityByHour(
    @Query() query: FindDepartQuantityReservationDto,
  ) {
    return this.parkingLotReservationService.findDepartReservationQuantityByHour(
      query,
    );
  }
}
