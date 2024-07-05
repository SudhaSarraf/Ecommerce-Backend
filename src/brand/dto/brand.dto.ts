import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {

    @IsNotEmpty()
    @IsString()
    brandName: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsString()
    userId: string;

    operatedBy?: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}