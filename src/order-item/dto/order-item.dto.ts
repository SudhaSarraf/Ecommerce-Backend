import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsInt, IsDecimal, IsUUID, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsDecimal()
  @IsNotEmpty()
  price: number;
}


export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @IsUUID()
  @IsOptional()
  id?: string;
}
