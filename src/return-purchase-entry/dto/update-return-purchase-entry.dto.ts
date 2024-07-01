import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnPurchaseEntryDto } from './create-return-purchase-entry.dto';

export class UpdateReturnPurchaseEntryDto extends PartialType(CreateReturnPurchaseEntryDto) {}
