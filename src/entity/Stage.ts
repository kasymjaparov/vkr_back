import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
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

    @ManyToOne(() => Order, (order) => order.stages)
    order: Order

    @OneToMany(() => Stage_Image, (stage_Image) => stage_Image.stage)
    stage_images: Stage_Image[]
}
