import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Act extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: "" })
    contract: string;

    @Column({ nullable: true })
    client: string;

    @Column({ nullable: true })
    pm: string;

    @Column({ nullable: true })
    builder: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
