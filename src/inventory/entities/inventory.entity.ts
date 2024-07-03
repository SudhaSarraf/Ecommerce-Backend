import { AbstractEntity } from "src/common/abstract.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'inventory', schema:'Public' })
export class InventoryEntity extends AbstractEntity<InventoryEntity> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false })
    quantity: number;

    @Column()
    productId: string;

    @Column()
    userId: string;

    @OneToMany(() => ProductEntity, (product) => product.inventory)
    @JoinColumn({ name: 'productId' })
    product?: ProductEntity[];

    @OneToMany(() => UserEntity, (user) => user.inventory)
    @JoinColumn({ name: 'userId' })
    user?: UserEntity[];
}
