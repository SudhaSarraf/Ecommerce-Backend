import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  
  @Entity({ name: 'pre_order' })
  export class PreOrderEntity {
    @PrimaryGeneratedColumn('uuid')
    preOrderId: string;
  
    @ManyToOne(() => UserEntity, (user) => user.preOrders, { eager: true })
    user: UserEntity;
  
    @ManyToOne(() => ProductEntity, { eager: true })
    product: ProductEntity;
  
    @Column('int')
    quantity: number;
  
    @Column('decimal')
    price: number;
  
    @Column('date')
    preOrderDate: Date;
  
    @Column('date')
    expectedDeliveryDate: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  