import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUnitDto {

    @IsNotEmpty()
    @IsString()
    unitName: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsString()
    userId: string;

    operatedBy?: string;
}

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}

