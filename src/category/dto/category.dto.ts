import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    categoryName: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsString()
    userId: string;

    operatedBy?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

