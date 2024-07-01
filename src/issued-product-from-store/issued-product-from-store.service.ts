import { Injectable } from '@nestjs/common';
import { CreateIssuedProductFromStoreDto } from './dto/create-issued-product-from-store.dto';
import { UpdateIssuedProductFromStoreDto } from './dto/update-issued-product-from-store.dto';

@Injectable()
export class IssuedProductFromStoreService {
  create(createIssuedProductFromStoreDto: CreateIssuedProductFromStoreDto) {
    return 'This action adds a new issuedProductFromStore';
  }

  findAll() {
    return `This action returns all issuedProductFromStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} issuedProductFromStore`;
  }

  update(id: number, updateIssuedProductFromStoreDto: UpdateIssuedProductFromStoreDto) {
    return `This action updates a #${id} issuedProductFromStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} issuedProductFromStore`;
  }
}
