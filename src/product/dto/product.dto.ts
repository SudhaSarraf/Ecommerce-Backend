import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDecimal, IsInt, IsDate, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Category, Tags } from '../entities/product.entity';
import { PartialType } from '@nestjs/mapped-types';

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

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsArray()
  @IsEnum(Tags, { each: true })
  @IsOptional()
  tags: Tags[];

  // @IsString()
  // @IsOptional()
  // organicCertification?: string;

  @IsDecimal()
  @Type(() => Number)
  @IsOptional()
  discountPrice?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  harvestDate?: Date;

  userId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  productId: string;
}