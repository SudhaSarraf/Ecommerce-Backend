import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseEntryService } from './purchase-entry.service';
import { CreatePurchaseEntryDto } from './dto/create-purchase-entry.dto';
import { UpdatePurchaseEntryDto } from './dto/update-purchase-entry.dto';

@Controller('purchase-entry')
export class PurchaseEntryController {
  constructor(private readonly purchaseEntryService: PurchaseEntryService) {}

  @Post()
  create(@Body() createPurchaseEntryDto: CreatePurchaseEntryDto) {
    return this.purchaseEntryService.create(createPurchaseEntryDto);
  }

  @Get()
  findAll() {
    return this.purchaseEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseEntryDto: UpdatePurchaseEntryDto) {
    return this.purchaseEntryService.update(+id, updatePurchaseEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseEntryService.remove(+id);
  }
}
