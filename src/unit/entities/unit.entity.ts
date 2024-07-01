import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'unit', schema:'Public' })
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unitName: string;

    @Column()
    status: boolean;

    @Column()
    operatedBy?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
