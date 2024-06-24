import { Test, TestingModule } from '@nestjs/testing';
import { PreOrderController } from './pre-order.controller';
import { PreOrderService } from './pre-order.service';

describe('PreOrderController', () => {
  let controller: PreOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreOrderController],
      providers: [PreOrderService],
    }).compile();

    controller = module.get<PreOrderController>(PreOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
