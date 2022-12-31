import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
