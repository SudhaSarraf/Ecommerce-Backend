import { Module } from '@nestjs/common';
import { ReturnPurchaseEntryService } from './return-purchase-entry.service';
import { ReturnPurchaseEntryController } from './return-purchase-entry.controller';

@Module({
  controllers: [ReturnPurchaseEntryController],
  providers: [ReturnPurchaseEntryService],
})
export class ReturnPurchaseEntryModule {}
