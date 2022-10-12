import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Design } from './Design';
import { Order } from './Order';
import { Stage } from './Stage';

@Entity()
export class Sample extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    visualisation_link!: string;

    @Column({ nullable: true })
    visualisation_desc_client: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, default: false })
    approved: boolean;

    @Column({ nullable: true })
    reason_not_approved: string;

    @ManyToOne(() => Order, (order) => order.samples)
    order: Order

    @OneToMany(() => Design, (design) => design.sample)
    designs: Design[]
}
