import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParkingLotService } from 'src/@core/application/usecase/parking-lot/parking-lot.service';
import { UserService } from '../@core/application/usecase/user/user.service';
import { CreateParkingReservationDto } from './dto/create-parking-reservation.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateParkingReservationDto } from './dto/update-parking-reservation.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly parkinglotService: ParkingLotService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('start-reservation')
  createReservation(
    @Body() createParkingReservationDto: CreateParkingReservationDto,
  ) {
    this.parkinglotService.startReservation(createParkingReservationDto);
  }

  @Post('finish-reservation')
  finishReservation(
    @Body() updateParkingReservationDto: UpdateParkingReservationDto,
  ) {
    return this.parkinglotService.finishReservation(
      updateParkingReservationDto,
    );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
