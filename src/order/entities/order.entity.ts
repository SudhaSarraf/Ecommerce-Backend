import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, { eager: true })
  user: UserEntity;

  @Column('decimal')
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { eager: true })
  orderItems: OrderItemEntity[];
}
