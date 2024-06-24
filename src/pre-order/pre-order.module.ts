import { NestjsFormDataModule } from 'nestjs-form-data';
import { Module } from '@nestjs/common';
import { PreOrderService } from './pre-order.service';
import { PreOrderController } from './pre-order.controller';
import { ProductService } from 'src/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreOrderEntity } from './entities/pre-order.entity';
import { UserService } from 'src/user/users.service';
import { UsersModule } from 'src/user/users.module';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PreOrderEntity]), NestjsFormDataModule, UsersModule, FilesModule],
  controllers: [PreOrderController],
  providers: [PreOrderService, ProductService, UserService, FilesService],
})
export class PreOrderModule {}
