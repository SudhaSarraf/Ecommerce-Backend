import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDecimal, IsInt, IsDate, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { ProductSection } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  files?: Array<Express.Multer.File>;
  

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  inStock: boolean;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsEnum(ProductSection)
  @IsNotEmpty()
  productSection: ProductSection;


  userId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  productId: string;
}