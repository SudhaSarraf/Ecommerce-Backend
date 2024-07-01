import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssuedProductFromStoreService } from './issued-product-from-store.service';
import { CreateIssuedProductFromStoreDto } from './dto/create-issued-product-from-store.dto';
import { UpdateIssuedProductFromStoreDto } from './dto/update-issued-product-from-store.dto';

@Controller('issued-product-from-store')
export class IssuedProductFromStoreController {
  constructor(private readonly issuedProductFromStoreService: IssuedProductFromStoreService) {}

  @Post()
  create(@Body() createIssuedProductFromStoreDto: CreateIssuedProductFromStoreDto) {
    return this.issuedProductFromStoreService.create(createIssuedProductFromStoreDto);
  }

  @Get()
  findAll() {
    return this.issuedProductFromStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuedProductFromStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssuedProductFromStoreDto: UpdateIssuedProductFromStoreDto) {
    return this.issuedProductFromStoreService.update(+id, updateIssuedProductFromStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuedProductFromStoreService.remove(+id);
  }
}
