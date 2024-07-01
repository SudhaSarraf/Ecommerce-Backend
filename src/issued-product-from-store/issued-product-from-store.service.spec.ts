import { Test, TestingModule } from '@nestjs/testing';
import { IssuedProductFromStoreService } from './issued-product-from-store.service';

describe('IssuedProductFromStoreService', () => {
  let service: IssuedProductFromStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuedProductFromStoreService],
    }).compile();

    service = module.get<IssuedProductFromStoreService>(IssuedProductFromStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
