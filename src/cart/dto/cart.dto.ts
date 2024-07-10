import { PartialType } from "@nestjs/mapped-types";
import { IsDecimal, IsNotEmpty, IsNumber, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class ProductDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsDecimal()
    quantity: number;
}

export class CreateCartDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    companyId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}
