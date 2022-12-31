import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VehicleSchema } from '../vehicle/vehicle.schema';

@Entity()
export class VehicleTypeSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  type: number;

  @OneToMany(() => VehicleSchema, (vehicle) => vehicle.vehicleType)
  vehicle: VehicleSchema[];
}
