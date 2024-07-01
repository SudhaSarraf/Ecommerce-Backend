import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductIssueDetail } from './product-issue-detail.entity';

@Entity()
export class ProductIssue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    miti: string;

    @Column()
    issuedByUser: string;

    @Column()
    issuedByDepartmentId: number;

    @Column()
    enteredBy: string;

    @Column()
    note: string;

    @OneToMany(() => ProductIssueDetail, detail => detail.productIssue)
    productIssueDetails: ProductIssueDetail[];
}