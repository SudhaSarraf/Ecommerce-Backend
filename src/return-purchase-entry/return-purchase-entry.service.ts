import { Injectable } from '@nestjs/common';
import { CreateReturnPurchaseEntryDto } from './dto/create-return-purchase-entry.dto';
import { UpdateReturnPurchaseEntryDto } from './dto/update-return-purchase-entry.dto';

@Injectable()
export class ReturnPurchaseEntryService {
  create(createReturnPurchaseEntryDto: CreateReturnPurchaseEntryDto) {
    return 'This action adds a new returnPurchaseEntry';
  }

  findAll() {
    return `This action returns all returnPurchaseEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} returnPurchaseEntry`;
  }

  update(id: number, updateReturnPurchaseEntryDto: UpdateReturnPurchaseEntryDto) {
    return `This action updates a #${id} returnPurchaseEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} returnPurchaseEntry`;
  }
}
