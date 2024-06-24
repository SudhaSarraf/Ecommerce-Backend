import { IsNotEmpty, IsString, IsInt, IsDecimal, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePreOrderDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  preOrderDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  expectedDeliveryDate: Date;
}

export class UpdatePreOrderDto extends PartialType(CreatePreOrderDto) {}

