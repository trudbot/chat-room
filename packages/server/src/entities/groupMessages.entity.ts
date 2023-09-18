import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GroupMessages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    group_id: number

    @Column()
    sender_id: number;

    @Column()
    message: string;

    @Column({ type: 'datetime' })
    sending_time: Date;
}
