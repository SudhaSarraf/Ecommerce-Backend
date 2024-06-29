import { BillMasterEntity } from "src/bill/entities/bill-master.entity";
import { CartEntity } from "src/cart/entities/cart.entity";
import { AbstractEntity } from "src/common/abstract.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { PreOrderEntity } from "src/pre-order/entities/pre-order.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { RoleEntity } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity extends AbstractEntity<UserEntity>{
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @PrimaryColumn()
    userId: string;

    @Column({ type: "varchar", length: 15, unique: true })
    phone?: string;

    @Column({
        nullable: true,
        default: null,
    })
    address?: string;

    @Column({ default: false })
    active: boolean;

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

    @OneToMany(() => PreOrderEntity, (preOrder) => preOrder.user)
    preOrders: PreOrderEntity[];

    @OneToMany(() => ProductEntity, (product) => product.user)
    product?: ProductEntity[];

    @OneToMany(() =>BillMasterEntity, (billEntity) => billEntity.user)
    bills: BillMasterEntity[];
}
