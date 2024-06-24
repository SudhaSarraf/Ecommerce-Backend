import { IsNotEmpty, IsUUID, IsDecimal, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto, UpdateOrderItemDto } from 'src/order-item/dto/order-item.dto';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsDecimal()
  @IsNotEmpty()
  totalAmount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}

export class UpdateOrderDto {
  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsDecimal()
  @IsOptional()
  totalAmount?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  orderItems?: UpdateOrderItemDto[];
}
