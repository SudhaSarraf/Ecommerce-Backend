import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'category', schema:'Public' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryName: string;

    @Column()
    status: boolean;

    @Column()
    operatedBy?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @OneToMany(() => ProductEntity, products => products.category)
    products: ProductEntity[];
}
