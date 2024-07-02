import { AbstractEntity } from "src/common/abstract.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'unit', schema:'Public' })
export class UnitEntity extends AbstractEntity<UnitEntity>{
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

    @OneToMany(() => ProductEntity, products => products.unit)
    products: ProductEntity[];
}
