import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { EntityManager, QueryFailedError } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { UserService } from 'src/user/users.service';
import { EntityNotFoundException } from 'src/common/errors/entityNotFoundException';

@Injectable()
export class ProductService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly filesService: FilesService,
    private readonly userService: UserService,

  ) {}

  async create(productDto: CreateProductDto) {
    try {
    //   let imageNames: string = '';
    //   if (productDto.files) {
    //     const namePromises = productDto.files.map(async (f: any) => await this.filesService.processFile(f));
    //     const names = await Promise.all(namePromises);
    //     imageNames = names.join();
    //   }

    //   // we need to append username, so we need this block of code.
    // const usr = await this.userService.findUserById(productDto.creatorId);
    // if (!usr) throw new HttpException('Author record not found in database.', 400);

    //   const product = {...productDto, images: imageNames};
    //   const productEntity = new ProductEntity(product);
      
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new ConflictException('Duplicate entry detected: ' + error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findAll() {
    try {
          const productData = await this.entityManager.find(ProductEntity, {
            where: {
              status: true
            },
            select :{
              productId: true,
              productCode: true,
              barcode: true,
              productName: true,
              purchasePrice: true,
              sellingPrice: true,
              offerPrice: true,
              offerFrom: true,
              offerUpto: true,
              images: true,
              productSection: true,
              companyId: true,
              categoryId: true,
              brandId: true,
              unitId: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
              status: true,
              creatorId: true,
              createdBy: true,
              updatedBy: true,
              category: {
                categoryName: true
              },
              brand: {
                brandName: true,
              },
              unit: {
                unitName: true,
              }
            },
            relations: ['category','brand','unit']
          });
          if(productData.length > 0) return productData;
          else throw new EntityNotFoundException();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.entityManager.findOne(ProductEntity, { 
        where: { 
          productId: id,
          status: true 
        },
        select :{
          productId: true,
          productCode: true,
          barcode: true,
          productName: true,
          purchasePrice: true,
          sellingPrice: true,
          offerPrice: true,
          offerFrom: true,
          offerUpto: true,
          images: true,
          productSection: true,
          companyId: true,
          categoryId: true,
          brandId: true,
          unitId: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          status: true,
          creatorId: true,
          createdBy: true,
          updatedBy: true,
          category: {
            categoryName: true
          },
          brand: {
            brandName: true,
          },
          unit: {
            unitName: true,
          }
        }
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } 
    catch (error) {
       throw error;
    }
  }

  async update(productDto: UpdateProductDto) {
    // find user which is updating the record
    // const user = await this.userService.findOne(productDto.userId);

    // let foundProducts = await this.findOne(productDto.productId);

    // // ideally, this error should never happen.
    // if (!foundProducts) throw new HttpException('News item not found in the database.', 400);

    // let updatedImages: string;

    // // process image updates
    // if (productDto.files) {
    //   const tmp = await this.filesService.processMultipleFiles(productDto.files, foundProducts.images);
    //   updatedImages = tmp.join(',');
    // }

    // const proId = foundProducts.productId;

    // const updatedProduct = await this.entityManager.save({
    //   ...productDto, id: proId, image: updatedImages, updatedBy: `${user.firstName} ${user.lastName}`, 
    // });

    // delete updatedProduct.files

    // if (!updatedProduct) throw new InternalServerErrorException('Failed to update news item');
    // return { updatedProduct };
  }

  async remove(id: string) {
    return this.entityManager.softDelete(ProductEntity, {id: id});
  }
}
