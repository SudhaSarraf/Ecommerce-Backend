import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity'; // Adjust the import path as needed
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity'; // Adjust the import path as needed

@Entity({ name: 'order', schema:'public' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, { eager: true })
  user: UserEntity;

  @Column({type:'decimal',  precision: 10, scale: 4, nullable: false })
  totalAmount: number;

  @Column({type:'decimal',  precision: 10, scale: 4, nullable: false })
  totalProducts: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
