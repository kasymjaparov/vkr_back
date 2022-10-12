import { Entity, PrimaryGeneratedColumn, Column, JoinTable, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Measurement } from './Measurement';
import { Order } from './Order';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false, default: null })
  password!: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  signature: string;

  @Column({ nullable: false })
  role!: Roles;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Order)
  @JoinTable()
  orders: Order[]


  //Measurement
  @OneToMany(() => Measurement, (measurement) => measurement.measure, { cascade: true, })
  measurements: Measurement[]

}
