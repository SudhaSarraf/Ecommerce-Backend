import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity'; // Adjust import path if necessary
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OrderService } from 'src/order/order.service'; // Ensure this path is correct
import { ProductService } from 'src/product/product.service'; // Ensure this path is correct
import { UserService } from 'src/user/users.service'; // Ensure this path is correct
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { UsersModule } from 'src/user/users.module';
import { OrderEntity } from 'src/order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemEntity, OrderEntity]),
    FilesModule,
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderService, ProductService, UserService, FilesService],
  exports: [OrderItemService]
})
export class OrderItemModule {}
