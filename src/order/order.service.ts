import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductService } from '../product/product.service';
import { OrderItemEntity } from '../order-item/entities/order-item.entity';
import { UserService } from 'src/user/users.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async findOne(orderId: string) {
    const order = await this.entityManager.findOne(OrderEntity, { where: { orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  

  async create(createOrderDto: CreateOrderDto) {
    try {
      // Fetch user
      const user = await this.userService.findOne(createOrderDto.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Initialize total amount
      let totalAmount = 0;
  
      // Process order items
      const orderItems = [];
      for (const item of createOrderDto.orderItems) {
        const product = await this.productService.findOne(item.productId);
        if (!product) {
          throw new NotFoundException(`Product with id ${item.productId} not found`);
        }
  
        // Calculate total price for the item and update total amount
        const itemTotalPrice = parseFloat((product.price * item.quantity).toFixed(2));
        totalAmount += itemTotalPrice;
  
        const orderItem = this.entityManager.create(OrderItemEntity, {
          ...item,
          product,
          price: itemTotalPrice, // Save price in order item
        });
  
        orderItems.push(orderItem);
      }
  
      // Create order entity with total amount
      const order = this.entityManager.create(OrderEntity, {
        ...createOrderDto,
        user,
        orderItems,
        totalAmount: parseFloat(totalAmount.toFixed(2)), // Ensure totalAmount is formatted correctly
      });
  
      // Save order and order items
      await this.entityManager.save(OrderEntity, order);
      for (const orderItem of orderItems) {
        await this.entityManager.save(OrderItemEntity, orderItem);
      }
  
      return order;
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    }
  }
  
  
  

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.findOne(id);
  
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
  
      if (updateOrderDto.userId) {
        const user = await this.userService.findOne(updateOrderDto.userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        order.user = user;
      }
  
      if (updateOrderDto.totalAmount !== undefined) {
        order.totalAmount = updateOrderDto.totalAmount;
      }
  
      if (updateOrderDto.orderItems) {
        const orderItems = [];
        for (const item of updateOrderDto.orderItems) {
          const orderItem = await this.entityManager.findOne(OrderItemEntity, { where: { orderItemId: item.id } });
          if (!orderItem) {
            throw new NotFoundException(`OrderItem with id ${item.id} not found`);
          }
  
          if (item.productId) {
            const product = await this.productService.findOne(item.productId);
            if (!product) {
              throw new NotFoundException(`Product with id ${item.productId} not found`);
            }
            orderItem.product = product;
          }
  
          if (item.quantity !== undefined) {
            orderItem.quantity = item.quantity;
          }
  
          if (item.price !== undefined) {
            orderItem.price = item.price;
          }
  
          const updatedOrderItem = await this.entityManager.save(OrderItemEntity, orderItem);
          orderItems.push(updatedOrderItem);
        }
  
        order.orderItems = orderItems;
      }
  
      return this.entityManager.save(OrderEntity, order);
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    }
  }
  
}
