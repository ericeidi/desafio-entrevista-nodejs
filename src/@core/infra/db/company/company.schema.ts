import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ParkingLotReservationSchema } from '../parking-lot-reservation/parking-lot-reservation.schema';

@Entity()
export class CompanySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column({ name: 'car_spaces' })
  carSpaces: number;

  @Column({ name: 'motorcyle_spaces' })
  motorCycleSpaces: number;

  @OneToMany(
    () => ParkingLotReservationSchema,
    (parkingLotReservation) => parkingLotReservation.vehicle,
  )
  parkingLotReservation: ParkingLotReservationSchema[];
}
