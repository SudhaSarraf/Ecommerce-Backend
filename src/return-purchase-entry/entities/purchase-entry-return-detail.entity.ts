import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseEntryReturn } from "./return-purchase-entry.entity";

@Entity()
export class PurchaseEntryReturnDetail {
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

    @ManyToOne(() => PurchaseEntryReturn, entry => entry.purchaseEntryReturnDetails)
    purchaseEntryReturn: PurchaseEntryReturn;
}