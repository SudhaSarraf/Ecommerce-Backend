import { PartialType } from '@nestjs/mapped-types';
import { CreateCompnayInfoDto } from './create-compnay-info.dto';

export class UpdateCompnayInfoDto extends PartialType(CreateCompnayInfoDto) {}
