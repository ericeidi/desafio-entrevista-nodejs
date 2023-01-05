import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ParkingLotReservationSchema } from '../parking-lot-reservation/parking-lot-reservation.schema';
import { UserSchema } from '../user/user.schema';
import { VehicleTypeSchema } from '../../../../@core/infra/db/vehicle-type/vehicle-type.schema';

@Entity()
export class VehicleSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @ManyToOne(() => VehicleTypeSchema, (vehicleType) => vehicleType.vehicle)
  vehicleType: VehicleTypeSchema;

  @ManyToOne(() => UserSchema, (user) => user.vehicles)
  user: UserSchema;

  @OneToMany(
    () => ParkingLotReservationSchema,
    (parkingLotReservation) => parkingLotReservation.vehicle,
  )
  parkingLotReservation: ParkingLotReservationSchema[];
}
