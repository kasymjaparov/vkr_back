import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Order } from './Order';

@Entity()
export class Order_Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Order, (order) => order.order_rooms, {
        onDelete: "CASCADE"
    })
    order: Order

}
