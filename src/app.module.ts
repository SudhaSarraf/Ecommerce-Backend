import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtGuard } from './guards/at.guard';
import { RoleModule } from './role/role.module';
import { dataSourceOtps } from './db/ormconfig';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OtpModule } from './otp/otp.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger.service.ts/logger.module';
import { UsersMiddleware } from './user/users.middleware';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { PreOrderModule } from './pre-order/pre-order.module';
import { RoleEntity } from './role/entities/role.entity';
import { UserEntity } from './user/entities/user.entity';
import { ProductEntity } from './product/entities/product.entity';
import { OrderEntity } from './order/entities/order.entity';
import { OrderItemEntity } from './order-item/entities/order-item.entity';
import { CartEntity } from './cart/entities/cart.entity';
import { CartItemEntity } from './cart-item/entities/cart-item.entity';
import { PreOrderEntity } from './pre-order/entities/pre-order.entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, NestjsFormDataModule,
  // ServeStaticModule.forRoot({
  //   rootPath: path.resolve(__dirname, 'files/static')
  // }),
  ServeStaticModule.forRootAsync({
    useFactory: () => {
      const uploadsPath = path.join(__dirname, 'files/static');
      return [
        {
          rootPath: uploadsPath,
          // serveRoot: '/static/',
        },
      ];
    },
  }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      ...dataSourceOtps,
      // autoLoadEntities: true,
      entities: [
        ProductEntity,
        OrderEntity,
        OrderItemEntity,
        CartEntity,
        CartItemEntity,
        PreOrderEntity,
        RoleEntity,
        UserEntity,
        ,
      ],
    }),
    inject: [ConfigService], // Explicitly inject ConfigService
  }),
    PassportModule, UsersModule, AuthModule, LoggerModule, RoleModule, FilesModule, OtpModule, CartModule, ProductModule, OrderModule, OrderItemModule, CartItemModule, PreOrderModule],
  controllers: [AppController],
  providers: [AppService, /*{ provide: APP_GUARD, useClass: AtGuard }*/],

})

// export class AppModule{}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes({ path: 'users/signup', method: RequestMethod.ALL });
  }
}
