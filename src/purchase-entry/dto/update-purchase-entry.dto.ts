import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseEntryDto } from './create-purchase-entry.dto';

export class UpdatePurchaseEntryDto extends PartialType(CreatePurchaseEntryDto) {}
