import { Injectable } from '@nestjs/common';
import { CreatePurchaseEntryDto } from './dto/create-purchase-entry.dto';
import { UpdatePurchaseEntryDto } from './dto/update-purchase-entry.dto';

@Injectable()
export class PurchaseEntryService {
  create(createPurchaseEntryDto: CreatePurchaseEntryDto) {
    return 'This action adds a new purchaseEntry';
  }

  findAll() {
    return `This action returns all purchaseEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseEntry`;
  }

  update(id: number, updatePurchaseEntryDto: UpdatePurchaseEntryDto) {
    return `This action updates a #${id} purchaseEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseEntry`;
  }
}
