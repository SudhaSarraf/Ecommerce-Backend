import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PreOrderService } from './pre-order.service';
import { CreatePreOrderDto, UpdatePreOrderDto } from './dto/pre-order.dto';

@Controller('pre-order')
export class PreOrderController {
  constructor(private readonly preOrderService: PreOrderService) {}

  @Post()
  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createPreOrderDto: CreatePreOrderDto) {
    return this.preOrderService.create(createPreOrderDto, userId);
  }

  @Get()
  findAll() {
    return this.preOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preOrderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePreOrderDto: UpdatePreOrderDto,
  ) {
    return this.preOrderService.update(+id, updatePreOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preOrderService.remove(+id);
  }
}
