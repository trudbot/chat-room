import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Group_messages{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    group_id: number

    @Column()
    sender_id: number;

    @Column()
    message: string

    @Column()
    sending_time: string
}
