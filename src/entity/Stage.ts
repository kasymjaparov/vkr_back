import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Order } from './Order';
import { Stage_Image } from './Stage_Image';

@Entity()
export class Stage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    doc!: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: true })
    check: string;

    @Column({ nullable: true, default: false })
    paid: string;

    @ManyToOne(() => Order, (order) => order.stages)
    order: Order

    @OneToMany(() => Stage_Image, (stage_Image) => stage_Image.stage)
    stage_images: Stage_Image[]
}
