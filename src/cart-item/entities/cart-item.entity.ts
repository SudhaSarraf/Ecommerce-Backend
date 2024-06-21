import { CartEntity } from "src/cart/entities/cart.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cart_item' })
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  cartItemId: string;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, { eager: true })
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}