import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCompnayInfoDto {
    @IsString()
    name: string;

    @IsString()
    regNo: string;

    @IsString()
    mobile: string;

    @IsString()
    email: string;

    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    country: string;
    
    @IsString()
    websiteLink: string;

    @IsString()
    estdDate: string;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsString()
    about: string;
}

export class TempDto extends OmitType(CreateCompnayInfoDto, ['regNo', 'status'] as const) {}

export class UpdateCompnayInfoDto extends PartialType(TempDto) {}

