import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Order } from './Order';
import { Stage_Image } from './Stage_Image';

@Entity()
export class Check extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    link: string;

    @Column({ nullable: true, default: false })
    approved: string;

    @ManyToOne(() => Order, (order) => order.checks)
    order: Order
}
