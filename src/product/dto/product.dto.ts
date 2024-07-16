import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDecimal,
  IsArray,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { ProductSection } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @Type(() => Number)
  @IsDecimal()
  @IsNotEmpty()
  purchasePrice: number;

  @IsString()
  @IsOptional()
  productDescription: string;

  @Type(() => Number)
  @IsDecimal()
  @IsNotEmpty()
  sellingPrice: number;

  @Type(() => Number)
  @IsDecimal()
  @IsNotEmpty()
  offerPrice: number;

  @IsString()
  offerFrom: Date;

  @IsString()
  offerUpto: Date;

  @IsString()
  manfDate: Date;

  @IsString()
  expiryDate: Date;

  @IsString()
  validityMonth: Date;

  images?: any;

  banner: any;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  status: boolean;

  @IsArray()
  @IsEnum(ProductSection)
  @IsNotEmpty()
  productSection: ProductSection;

  @Type(() => Number)
  @IsNumber()
  companyId: number;

  @Type(() => Number)
  @IsNumber()
  categoryId?: number;

  @Type(() => Number)
  @IsNumber()
  brandId?: number;

  @Type(() => Number)
  @IsNumber()
  unitId?: number;

  @IsNumber()
  @IsNotEmpty()
  creatorId: number;

  @Type(() => Number)
  @IsNumber()
  inventoryId: number;

  createdBy: string;

  updatedBy?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: number;
}
