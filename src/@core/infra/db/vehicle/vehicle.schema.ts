import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserSchema } from '../user/user.schema';
import { VehicleTypeSchema } from '../vehicle-type/vehicle-type.schema';

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
}
