import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseEntry } from "./purchase-entry.entity";

@Entity()
export class PurchaseEntryDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    categoryId: number;

    @Column('decimal')
    quantity: number;

    @Column()
    untiId: number;

    @Column('decimal')
    pricePerUnit: number;

    @Column('decimal')
    totalPrice: number;

    @ManyToOne(() => PurchaseEntry, entry => entry.purchaseEntryDetails)
    purchaseEntry: PurchaseEntry;
}