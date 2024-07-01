import { Injectable } from '@nestjs/common';
import { CreateCompnayInfoDto } from './dto/create-compnay-info.dto';
import { UpdateCompnayInfoDto } from './dto/update-compnay-info.dto';

@Injectable()
export class CompnayInfoService {
  create(createCompnayInfoDto: CreateCompnayInfoDto) {
    return 'This action adds a new compnayInfo';
  }

  findAll() {
    return `This action returns all compnayInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compnayInfo`;
  }

  update(id: number, updateCompnayInfoDto: UpdateCompnayInfoDto) {
    return `This action updates a #${id} compnayInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} compnayInfo`;
  }
}
