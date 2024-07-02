import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDecimal, IsInt, IsDate, IsArray, IsBoolean, IsNumber } from 'class-validator';
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

  @Type(() => Number)
  @IsDecimal()
  @IsNotEmpty()
  sellingPrice: number;

  @Type(() => Number)
  @IsDecimal()
  @IsNotEmpty()
  offerPrice: number;

  @Type(() => Number)
  @IsNumber()
  offerFrom: number

  @Type(() => Number)
  @IsNumber()
  offerUpto: number

  files?: Array<Express.Multer.File>;
  

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  status: boolean;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsEnum(ProductSection)
  @IsNotEmpty()
  productSection: ProductSection;

  @Type(() => Number)
  @IsNumber()
  companyId: number;

  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  brandId: number;

  unitId: number;

  @IsString()
  @IsNotEmpty()
  creatorId: string;

  createdBy: string;

  updatedBy?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  productId: string;
}