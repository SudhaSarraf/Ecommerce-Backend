import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateUnitDto {

    @IsString()
    unitName: string;

    @IsString()
    companyId: string;

    @IsString()
    userId: string;

    operatedBy?: string;
}

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}

