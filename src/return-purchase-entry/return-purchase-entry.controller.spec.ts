import { Test, TestingModule } from '@nestjs/testing';
import { ReturnPurchaseEntryController } from './return-purchase-entry.controller';
import { ReturnPurchaseEntryService } from './return-purchase-entry.service';

describe('ReturnPurchaseEntryController', () => {
  let controller: ReturnPurchaseEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnPurchaseEntryController],
      providers: [ReturnPurchaseEntryService],
    }).compile();

    controller = module.get<ReturnPurchaseEntryController>(ReturnPurchaseEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
