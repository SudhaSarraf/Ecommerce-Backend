import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { RoleModule } from './role/role.module';
import { FileModule } from './files/files.module';

@Module({
  imports: [UserModule, ProductModule, AuthModule, CartModule, RoleModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
