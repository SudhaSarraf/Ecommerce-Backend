import { Roles } from './../guards/role.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/guards/role.guard';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(RoleGuard)
  // @Roles('admin', 'author')
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @FormDataRequest()
  create(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create({
      ...createProductDto,
    });
  }

  @Get('getAll')
  findAll() {
    return this.productService.findAll();
  }

  @Get('getById/:id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Get('/getByCategory/:categoryId')
  async findByAdsCategory(@Param('categoryId') categoryId: number) {
    return await this.productService.findByCategory(+categoryId);
  }

  @Get('/getByBrand/:brandId')
  async findByAdsBrand(@Param('brandId') brandId: number) {
    return await this.productService.findByBrand(+brandId);
  }

  // @UseGuards(RoleGuard)
  // @Roles('admin', 'author')
  @HttpCode(HttpStatus.CREATED)
  @FormDataRequest()
  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update({
      ...updateProductDto,
      id: id,
    });
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
