import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnPurchaseEntryService } from './return-purchase-entry.service';
import { CreateReturnPurchaseEntryDto } from './dto/create-return-purchase-entry.dto';
import { UpdateReturnPurchaseEntryDto } from './dto/update-return-purchase-entry.dto';

@Controller('return-purchase-entry')
export class ReturnPurchaseEntryController {
  constructor(private readonly returnPurchaseEntryService: ReturnPurchaseEntryService) {}

  @Post()
  create(@Body() createReturnPurchaseEntryDto: CreateReturnPurchaseEntryDto) {
    return this.returnPurchaseEntryService.create(createReturnPurchaseEntryDto);
  }

  @Get()
  findAll() {
    return this.returnPurchaseEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnPurchaseEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnPurchaseEntryDto: UpdateReturnPurchaseEntryDto) {
    return this.returnPurchaseEntryService.update(+id, updateReturnPurchaseEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnPurchaseEntryService.remove(+id);
  }
}
