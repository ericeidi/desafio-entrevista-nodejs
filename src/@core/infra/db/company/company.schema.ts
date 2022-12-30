import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CompanySchema {
  //typeorm
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

  @Column()
  carSpaces: number;

  @Column()
  motorCycleSpaces: number;
}
