import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const order = await this.orderService.findOne(createOrderItemDto.orderId);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
  
      const product = await this.productService.findOne(createOrderItemDto.productId);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
  
      const orderItem = this.entityManager.create(OrderItemEntity, {
        ...createOrderItemDto,
        order,
        product,
      });
  
      return this.entityManager.save(OrderItemEntity, orderItem);
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    }
  }
  

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const orderItem = await this.entityManager.findOne(OrderItemEntity, { where: { orderItemId: id } });
      if (!orderItem) {
        throw new NotFoundException('Order item not found');
      }
  
      if (updateOrderItemDto.orderId) {
        const order = await this.orderService.findOne(updateOrderItemDto.orderId);
        if (!order) {
          throw new NotFoundException('Order not found');
        }
        orderItem.order = order;
      }
  
      if (updateOrderItemDto.productId) {
        const product = await this.productService.findOne(updateOrderItemDto.productId);
        if (!product) {
          throw new NotFoundException('Product not found');
        }
        orderItem.product = product;
      }
  
      if (updateOrderItemDto.quantity !== undefined) {
        orderItem.quantity = updateOrderItemDto.quantity;
      }
  
      if (updateOrderItemDto.price !== undefined) {
        orderItem.price = updateOrderItemDto.price;
      }
  
      return this.entityManager.save(OrderItemEntity, orderItem);
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    }
  }
  
}
