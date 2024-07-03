import { BillMasterEntity } from "src/bill/entities/bill-master.entity";
import { BrandEntity } from "src/brand/entities/brand.entity";
import { CartEntity } from "src/cart/entities/cart.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { AbstractEntity } from "src/common/abstract.entity";
import { CompanyInfoEntity } from "src/compnay-info/entities/compnay-info.entity";
import { InventoryEntity } from "src/inventory/entities/inventory.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { RoleEntity } from "src/role/entities/role.entity";
import { UnitEntity } from "src/unit/entities/unit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity extends AbstractEntity<UserEntity> {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "varchar", length: 15, unique: true })
    phone?: string;

    @Column({
        nullable: true,
        default: null,
    })
    address?: string;

    @Column({ default: false })
    active: boolean;

    @Column()
    companyId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt?: Date;

    @Column({ default: null, nullable: true })
    updatedBy?: string;

    @DeleteDateColumn({ default: null, nullable: true })
    deletedAt?: Date;

    @Column()
    createdBy?: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 200 })
    password: string;

    @Column({
        nullable: false,
        default: 'N/A'
    })
    @Column()
    image?: string;

    @Column({ nullable: true, default: null, type: 'text' })
    hashedRt: string;

    @Column('int', { nullable: true, default: null })
    otp1: number;

    @Column('int', { nullable: true, default: null })
    otp2: number;

    @Column('int', { nullable: true, default: null })
    otp3: number;

    @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
    @JoinTable()
    roles: RoleEntity[];

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

    @OneToOne(() => CartEntity, (cart) => cart.user, { cascade: true })
    cart: CartEntity;

    @OneToMany(() => ProductEntity, (product) => product.user)
    product?: ProductEntity[];

    @OneToMany(() => CategoryEntity, (category) => category.user)
    category?: CategoryEntity[];

    @OneToMany(() => BrandEntity, (brand) => brand.user)
    brand?: BrandEntity[];

    @OneToMany(() => UnitEntity, (unit) => unit.user)
    unit?: UnitEntity[];

    @OneToMany(() => BillMasterEntity, (billEntity) => billEntity.user)
    bills: BillMasterEntity[];

    @ManyToOne(() => InventoryEntity, (inventory) => inventory.user, { nullable: false, eager: true, cascade: ['insert', 'update'] })
    inventory: InventoryEntity;

    @ManyToOne(() => CompanyInfoEntity, company => company.users)
    @JoinColumn({ name: 'companyId' })
    company: CompanyInfoEntity;
}
