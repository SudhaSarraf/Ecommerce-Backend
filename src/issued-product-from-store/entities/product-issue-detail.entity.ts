import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductIssue } from "./issued-product-from-store.entity";

@Entity()
export class ProductIssueDetail {
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

    @ManyToOne(() => ProductIssue, issue => issue.productIssueDetails)
    productIssue: ProductIssue;
}