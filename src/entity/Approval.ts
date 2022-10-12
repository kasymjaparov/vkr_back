import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Order } from './Order';

@Entity()
export class Approval extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    doc!: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, default: false })
    approved: string;

    @ManyToOne(() => Order, (order) => order.approvals)
    order: Order
}
