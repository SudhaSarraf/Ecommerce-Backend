import { PartialType } from '@nestjs/mapped-types';
import { CreateIssuedProductFromStoreDto } from './create-issued-product-from-store.dto';

export class UpdateIssuedProductFromStoreDto extends PartialType(CreateIssuedProductFromStoreDto) {}
