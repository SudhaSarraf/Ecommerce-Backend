import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    brandName: string;

    @IsString()
    companyId: string;

    @IsString()
    userId: string;

    operatedBy?: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}