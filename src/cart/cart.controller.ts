import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get('getAll/:userId')
  findAll(@Param('userId') userId: number) {
    return this.cartService.findAll(userId);
  }

  @Get('getById/:id')
  findOne(@Param('id') id: number) {
    return this.cartService.findOne(+id);
  }



  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: number) {
    return this.cartService.remove(+id);
  }
}
