import { Test, TestingModule } from '@nestjs/testing';
import { IssuedProductFromStoreController } from './issued-product-from-store.controller';
import { IssuedProductFromStoreService } from './issued-product-from-store.service';

describe('IssuedProductFromStoreController', () => {
  let controller: IssuedProductFromStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuedProductFromStoreController],
      providers: [IssuedProductFromStoreService],
    }).compile();

    controller = module.get<IssuedProductFromStoreController>(IssuedProductFromStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
