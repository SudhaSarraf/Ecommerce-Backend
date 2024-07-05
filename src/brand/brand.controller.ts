import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('create')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get('getAll')
  findAll() {
    return this.brandService.findAll();
  }

  @Get('getById/:id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
