import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Act } from './Act';
import { flatSeries, repairType } from "../interface/order.interface"
import { User } from './User';
import { Order_Image } from './Order_Image';
import { Order_Room } from './Order_Room';
import { Measurement } from './Measurement';
import { Approval } from './Approval';
import { Stage } from './Stage';
import { Sample } from './Sample';
import { Check } from './Check';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    address!: string;

    @Column({ nullable: false, })
    series!: flatSeries;

    @Column({ nullable: false })
    amount_room!: number;

    @Column({ nullable: true })
    type: repairType;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    contract: string;

    @Column({ nullable: true, default: false })
    contract_signed: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Act, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    act: Act

    @OneToOne(() => Measurement, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    measurement: Measurement

    @OneToMany(() => Order_Image, (order_image) => order_image.order)
    order_images: Order_Image[]

    @OneToMany(() => Approval, (approval) => approval.order)
    approvals: Approval[]

    @OneToMany(() => Stage, (stage) => stage.order)
    stages: Stage[]

    @OneToMany(() => Order_Room, (order_room) => order_room.order)
    order_rooms: Order_Room[]

    @OneToMany(() => Check, (check) => check.order)
    checks: Check[]

    @OneToMany(() => Sample, (sample) => sample.order)
    samples: Sample[]

    @ManyToMany(type => User, user => user.orders)
    @JoinTable()
    users: User[];

}
