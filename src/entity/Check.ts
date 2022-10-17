import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Check extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    link: string;

    @Column({ nullable: true, default: false })
    approved: boolean;

    @ManyToOne(() => Order, (order) => order.checks)
    order: Order
}
