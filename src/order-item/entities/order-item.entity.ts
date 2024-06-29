import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity'; // Check the path to OrderEntity
import { ProductEntity } from 'src/product/entities/product.entity'; // Check the path to ProductEntity

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  orderItemId: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, { eager: true }) // Ensure ProductEntity is correctly imported
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
