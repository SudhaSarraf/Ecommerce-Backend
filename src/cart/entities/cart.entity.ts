import { CartItemEntity } from "src/cart-item/entities/cart-item.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  cartId: string;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, { eager: true })
  cartItems: CartItemEntity[];
}