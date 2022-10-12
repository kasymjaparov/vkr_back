import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Measurement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    link!: string;


    @Column({ nullable: true })
    client: string;

    @Column({ nullable: true, default: "" })
    come_datetime: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    description_client: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (measure) => measure.measurements)
    measure: User
}
