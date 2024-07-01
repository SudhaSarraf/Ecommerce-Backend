import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PurchaseEntryReturnDetail } from './purchase-entry-return-detail.entity';

@Entity()
export class PurchaseEntryReturn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    miti: string;

    @Column()
    partyName: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    refBill: string;

    @Column({ nullable: true })
    purchaseOrderNo: string;

    @Column({ nullable: true })
    PO_refBill: string;

    @Column('decimal')
    total: number;

    @Column('decimal')
    discPc: number;

    @Column('decimal')
    discAmt: number;

    @Column('decimal')
    subTotal: number;

    @Column('decimal')
    tax: number;

    @Column('decimal')
    taxAmount: number;

    @Column('decimal')
    netTotal: number;

    @Column()
    inWords: string;

    @Column()
    transectionOn: string;

    @Column({ nullable: true })
    PO_status: string;

    @Column()
    enteredBy: string;

    @Column()
    note: string;

    @OneToMany(() => PurchaseEntryReturnDetail, detail => detail.purchaseEntryReturn)
    purchaseEntryReturnDetails: PurchaseEntryReturnDetail[];
}