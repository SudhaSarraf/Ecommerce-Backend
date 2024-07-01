import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'brand', schema:'Public' })
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brandName: string;

    @Column()
    status: boolean;

    @Column()
    operatedBy?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @OneToMany(() => ProductEntity, products => products.brand)
    products: ProductEntity[];
}
