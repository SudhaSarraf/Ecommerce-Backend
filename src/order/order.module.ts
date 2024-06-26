import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity'; // Adjust import path if necessary
import { UsersModule } from 'src/user/users.module';
import { ProductModule } from 'src/product/product.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/users.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    UsersModule,
    FilesModule
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductService, UserService],
  exports: [OrderService]
})
export class OrderModule {}
