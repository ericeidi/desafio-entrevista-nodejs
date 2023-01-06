import { ParkingLotReservation } from '../../../../@core/domain/entity/parking-lot-reservation/parking-lot-reservation';
import { Vehicle } from '../../../../@core/domain/entity/vehicle/vehicle';
import { FormatBetweenDates } from '../../../../shared/utils/format-between-dates-typeorm';
import { Repository } from 'typeorm';
import { FindDepartQuantityReservationDto } from '../../../../parking-lot-reservation/dto/find-arrival-reservation-quantity.dto';
import { FindArrivalQuantityReservationDto } from '../../../../parking-lot-reservation/dto/find-depart-reservation-quantity.dto';
import { ParkingLotReservationRepository } from '../../../domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { ParkingLotReservationSchema } from './parking-lot-reservation.schema';

export class ParkingLotReservationTypeormRepository
  implements ParkingLotReservationRepository
{
  constructor(private ormRepository: Repository<ParkingLotReservationSchema>) {}
  async findAllReservations(): Promise<ParkingLotReservation[]> {
    const responseParkingLot = await this.ormRepository.find({
      relations: ['vehicle', 'vehicle.user', 'company'],
    });

    return responseParkingLot;
  }

  async findReservationByCompany(
    companyId: number,
  ): Promise<ParkingLotReservation[]> {
    const responseParkingLot = await this.ormRepository.find({
      relations: ['vehicle', 'vehicle.user', 'company'],
      where: {
        company: {
          id: companyId,
        },
      },
    });
    return responseParkingLot;
  }

  async findArrivalReservationQuantityByHour({
    date,
    startHour,
    endHour,
  }: FindArrivalQuantityReservationDto): Promise<
    [ParkingLotReservation[], number]
  > {
    const responseParkingLot = await this.ormRepository.findAndCount({
      relations: ['vehicle', 'vehicle.user', 'company'],
      where: {
        arrivalTime: FormatBetweenDates(date, startHour, endHour),
      },
    });
    return responseParkingLot;
  }
  async findDepartReservationQuantityByHour({
    date,
    startHour,
    endHour,
  }: FindDepartQuantityReservationDto): Promise<
    [ParkingLotReservation[], number]
  > {
    const responseParkingLot = await this.ormRepository.findAndCount({
      relations: ['vehicle', 'vehicle.user', 'company'],
      where: {
        departTime: FormatBetweenDates(date, startHour, endHour),
      },
    });
    return responseParkingLot;
  }
  async update(parkingLotReservation: ParkingLotReservation): Promise<void> {
    await this.ormRepository.save(parkingLotReservation);
  }
  async findByVehicle(
    vehicle: Vehicle,
  ): Promise<ParkingLotReservationSchema[]> {
    const model = await this.ormRepository.find({
      relations: {
        company: true,
      },
      where: {
        vehicle: vehicle,
      },
      order: { id: 'DESC' },
    });
    if (!model) {
      return null;
    }
    return model;
  }

  async insert(parkingLotReservations: ParkingLotReservation): Promise<void> {
    const model = this.ormRepository.create(parkingLotReservations);
    await this.ormRepository.insert(model);
  }
}
