import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
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
