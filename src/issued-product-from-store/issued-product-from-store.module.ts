import { Module } from '@nestjs/common';
import { IssuedProductFromStoreService } from './issued-product-from-store.service';
import { IssuedProductFromStoreController } from './issued-product-from-store.controller';

@Module({
  controllers: [IssuedProductFromStoreController],
  providers: [IssuedProductFromStoreService],
})
export class IssuedProductFromStoreModule {}
