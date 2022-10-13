import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Roles from '../enum/Roles.enum'
import { Order } from './Order';
import { Sample } from './Sample';
import { Stage } from './Stage';

@Entity()
export class Design extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    visualisation_link!: string;

    @Column({ nullable: true })
    visualisation_desc_client: string;

    @Column({ nullable: true })
    description: string;

    
    @Column({ nullable: true })
    description_client: string;

    @Column({ nullable: true, default: false })
    approved: boolean;

    @Column({ nullable: true })
    reason_not_approved: string;

    @ManyToOne(() => Sample, (sample) => sample.designs)
    sample: Sample
}