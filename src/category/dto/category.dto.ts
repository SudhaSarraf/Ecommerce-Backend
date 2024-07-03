import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    categoryName: string;

    @IsString()
    companyId: string;

    @IsString()
    userId: string;

    operatedBy?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

