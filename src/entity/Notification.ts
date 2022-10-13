import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Order } from './Order';
import { User } from './User';

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, default: false })
    watchced: boolean;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User
}
