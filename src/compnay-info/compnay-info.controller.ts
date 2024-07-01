import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompnayInfoService } from './compnay-info.service';
import { CreateCompnayInfoDto } from './dto/create-compnay-info.dto';
import { UpdateCompnayInfoDto } from './dto/update-compnay-info.dto';

@Controller('compnay-info')
export class CompnayInfoController {
  constructor(private readonly compnayInfoService: CompnayInfoService) {}

  @Post()
  create(@Body() createCompnayInfoDto: CreateCompnayInfoDto) {
    return this.compnayInfoService.create(createCompnayInfoDto);
  }

  @Get()
  findAll() {
    return this.compnayInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compnayInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompnayInfoDto: UpdateCompnayInfoDto) {
    return this.compnayInfoService.update(+id, updateCompnayInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compnayInfoService.remove(+id);
  }
}
