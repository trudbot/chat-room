import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    group_id: number;

    @Column()
    group_name: string;
}
