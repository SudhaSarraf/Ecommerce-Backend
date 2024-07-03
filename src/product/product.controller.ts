import { Roles } from './../guards/role.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,UploadedFiles, Req, UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(RoleGuard)
  // @Roles('admin', 'author')
  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  create(@Body() createProductDto: CreateProductDto, /*@Req() req: any,*/ @UploadedFiles() images: any) {
    return this.productService.create({...createProductDto, files: images, /*userId: req.user.userId*/ });
  }

  @Get('getAll')
  findAll() {
    return this.productService.findAll();
  }

  @Get('getById/:id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // @Get('/getByCategory/:category')
  // async findByAdsCategory(@Param('category') category: Category) {
  //   return await this.productService.findByCategory(category);
  // }

  // @UseGuards(RoleGuard)
  // @Roles('admin', 'author')
  @UseInterceptors(FilesInterceptor('images'))
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() images: Array<Express.Multer.File>) {
    return this.productService.update({
      ...updateProductDto,
      productId: id,
      files: images
    });
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
