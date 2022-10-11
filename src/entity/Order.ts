import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany } from 'typeorm';
import Roles from '../enum/Roles.enum'

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    address!: string;

    @Column({ nullable: false, })
    series!: "105" | "104" | "Сталинка" | "Хрущевка" | "104 улучшенная" | "106" | "Индивидуальный проект";

    @Column({ nullable: false })
    amount_room: number;

    @Column({ nullable: true })
    type: "Капитальный" | "Косметический";

    @Column({ nullable: true })
    patronymic: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    signature: string;

    @Column({ nullable: false })
    role!: Roles;

}
