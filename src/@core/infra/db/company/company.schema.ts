import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CompanySchema {
  //typeorm
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 15 })
  cnpj: string;
}
