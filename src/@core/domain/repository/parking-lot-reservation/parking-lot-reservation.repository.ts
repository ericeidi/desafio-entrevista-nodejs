import { ParkingLotReservationSchema } from 'src/@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { ParkingLotReservation } from '../../entity/parking-lot-reservation/parking-lot-reservation';
import { Vehicle } from '../../entity/vehicle/vehicle';

export interface ParkingLotReservationRepository {
  insert(parkingLotReservation: ParkingLotReservation): Promise<void>;
  update(parkingLotReservation: ParkingLotReservation): Promise<void>;
  findByVehicle(vehicle: Vehicle): Promise<ParkingLotReservationSchema[]>;
}
