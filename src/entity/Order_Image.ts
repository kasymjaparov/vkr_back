import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Order } from './Order';

@Entity()
export class Order_Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    link: string;

    @ManyToOne(() => Order, (order) => order.order_images, {
        onDelete: "CASCADE"
    })
    order: Order

}
