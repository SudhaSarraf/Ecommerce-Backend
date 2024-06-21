import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity({ name: 'order_item' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  orderItemId: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, { eager: true })
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}
