import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany } from 'typeorm';
import Roles from '../enum/Roles.enum'

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
  uuid: string;

  @Column({ nullable: false })
  role!: Roles;

}
