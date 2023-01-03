import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanySchema } from '../company/company.schema';
import { VehicleSchema } from '../vehicle/vehicle.schema';

@Entity()
export class ParkingLotReservationSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'arrival_time', type: 'datetime' })
  arrivalTime: string;

  @Column({ name: 'depart_time', type: 'datetime', nullable: true })
  departTime: string;

  @ManyToOne(() => VehicleSchema, (vehicle) => vehicle.parkingLotReservation)
  vehicle: VehicleSchema;

  @ManyToOne(() => CompanySchema, (company) => company.parkingLotReservation)
  company: CompanySchema;
}
