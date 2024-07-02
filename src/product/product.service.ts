import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { EntityManager, QueryFailedError } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { UserService } from 'src/user/users.service';
import { EntityNotFoundException } from 'src/common/errors/entityNotFoundException';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly filesService: FilesService,
    private readonly userService: UserService,
  ) { }

  async create(productDto: CreateProductDto) {
    try {
      let entryData = new ProductEntity(productDto);

      return await this.entityManager.transaction(async (eManager) => {
        let imageNames: string = '';
        if (productDto.files) {
          const namePromises = productDto.files.map(async (f: any) => await this.filesService.processFile(f));
          const names = await Promise.all(namePromises);
          imageNames = names.join();
        }

        // we need to append username, so we need this block of code.
        const usr = await eManager.findOne(UserEntity, {
          where: {
            userId: productDto.creatorId
          }
        });
        if (!usr) throw new HttpException('Author record not found in database.', 400);

        const newDate = new Date();

        let year = newDate.getFullYear().toString().slice(-2);
        let month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 and pad with 0 if necessary
        let day = newDate.getDate().toString().padStart(2, '0'); // Get the day of the month and pad with 0 if necessary

        const formattedDate = `${year}${month}${day}`;
        let prodName = productDto.productName.substring(0, 3).toUpperCase();
        let barcode = (`${formattedDate}${prodName}${entryData.companyId}`)

        const product = { ...productDto, barcode, images: imageNames };
        const productEntity = new ProductEntity(product);

        console.log('product entity', productEntity);

        console.log('product entity', productEntity);

        const productDataResult = await eManager.insert(ProductEntity, productEntity);
        if (productDataResult.identifiers[0].id === 0) throw new InternalServerErrorException();
        console.log(productDataResult);

        // const inventoryCreate = await eManager.insert


      })
    } catch (error) {
      console.log('errror', error);
      throw error;
      // if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
      //   throw new ConflictException('Duplicate entry detected: ' + error.message);
      // } else {
      //   throw new InternalServerErrorException(error.message);
      // }
    }
  }

  async findAll() {
    try {
          const productData = await this.entityManager.find(ProductEntity, {
            where: {
              status: true
            },
            select :{
              id: true,
              productCode: true,
              barcode: true,
              productName: true,
              purchasePrice: true,
              sellingPrice: true,
              offerPrice: true,
              offerFrom: true,
              offerUpto: true,
              manfDate: true,
              expiryDate: true,
              validityMonth: true,
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
          id: id,
          status: true
        },
        select: {
          id: true,
          productCode: true,
          barcode: true,
          productName: true,
          purchasePrice: true,
          sellingPrice: true,
          offerPrice: true,
          offerFrom: true,
          offerUpto: true,
          manfDate: true,
          expiryDate: true,
          validityMonth: true,
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

    // let foundProducts = await this.findOne(productDto.id);

    // // ideally, this error should never happen.
    // if (!foundProducts) throw new HttpException('News item not found in the database.', 400);

    // let updatedImages: string;

    // // process image updates
    // if (productDto.files) {
    //   const tmp = await this.filesService.processMultipleFiles(productDto.files, foundProducts.images);
    //   updatedImages = tmp.join(',');
    // }

    // const proId = foundProducts.id;

    // const updatedProduct = await this.entityManager.save({
    //   ...productDto, id: proId, image: updatedImages, updatedBy: `${user.firstName} ${user.lastName}`, 
    // });

    // delete updatedProduct.files

    // if (!updatedProduct) throw new InternalServerErrorException('Failed to update news item');
    // return { updatedProduct };
  }

  async remove(id: string) {
    return this.entityManager.softDelete(ProductEntity, { id: id });
  }
}
