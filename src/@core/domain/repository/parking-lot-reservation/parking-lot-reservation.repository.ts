import { ParkingLotReservationSchema } from 'src/@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { FindDepartQuantityReservationDto } from 'src/parking-lot-reservation/dto/find-arrival-reservation-quantity.dto';
import { FindArrivalQuantityReservationDto } from '../../../../parking-lot-reservation/dto/find-depart-reservation-quantity.dto';
import { ParkingLotReservation } from '../../entity/parking-lot-reservation/parking-lot-reservation';
import { Vehicle } from '../../entity/vehicle/vehicle';

export interface ParkingLotReservationRepository {
  insert(parkingLotReservation: ParkingLotReservation): Promise<void>;
  update(parkingLotReservation: ParkingLotReservation): Promise<void>;
  findByVehicle(vehicle: Vehicle): Promise<ParkingLotReservation[]>;
  findAllReservations(): Promise<ParkingLotReservation[]>;
  findReservationByCompany(companyId: number): Promise<ParkingLotReservation[]>;
  findDepartReservationQuantityByHour(
    query: FindDepartQuantityReservationDto,
  ): Promise<[ParkingLotReservation[], number]>;
  findArrivalReservationQuantityByHour(
    query: FindArrivalQuantityReservationDto,
  ): Promise<[ParkingLotReservation[], number]>;
}
