import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Order } from './Order';
import { Stage } from './Stage';

@Entity()
export class Stage_Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    link!: string;

    @ManyToOne(() => Stage, (stage) => stage.stage_images)
    stage: Stage
}
