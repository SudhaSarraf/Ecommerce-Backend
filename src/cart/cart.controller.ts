import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
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

  @Get('getProductIds')
  async checkQuantity(@Body() pids: any) {
    console.log('pids', pids)
    // if (!Array.isArray(ids) || ids.length === 0) {
    //   throw new HttpException(
    //     'No product IDs provided',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    return await this.cartService.checkQuantity(pids);
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
