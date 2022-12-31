import { ParkingLotReservation } from 'src/@core/domain/entity/parking-lot-reservation/parking-lot-reservation';
import { Repository } from 'typeorm';
import { ParkingLotReservationSchema } from './parking-lot-reservation.schema';
import { ParkingLotReservationRepository } from '../../../domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { Vehicle } from 'src/@core/domain/entity/vehicle/vehicle';

export class ParkingLotReservationTypeormRepository
  implements ParkingLotReservationRepository
{
  constructor(private ormRepository: Repository<ParkingLotReservationSchema>) {}
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
