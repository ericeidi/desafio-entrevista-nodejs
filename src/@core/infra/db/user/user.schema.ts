import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VehicleSchema } from '../vehicle/vehicle.schema';

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => VehicleSchema, (vehicle) => vehicle.user)
  vehicles: VehicleSchema[];
}
