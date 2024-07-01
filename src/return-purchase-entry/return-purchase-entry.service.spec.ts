import { Test, TestingModule } from '@nestjs/testing';
import { ReturnPurchaseEntryService } from './return-purchase-entry.service';

describe('ReturnPurchaseEntryService', () => {
  let service: ReturnPurchaseEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnPurchaseEntryService],
    }).compile();

    service = module.get<ReturnPurchaseEntryService>(ReturnPurchaseEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
