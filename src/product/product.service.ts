import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { EntityManager, QueryFailedError } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { EntityNotFoundException } from 'src/common/errors/entityNotFoundException';
import { UserEntity } from 'src/user/entities/user.entity';
import { InventoryEntity } from 'src/inventory/entities/inventory.entity';
import { SuccessReturn } from 'src/common/success/successReturn';

@Injectable()
export class ProductService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly filesService: FilesService,
  ) {}

  private generateUniqueIdentifier(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  async create(productDto: CreateProductDto) {
    try {
      const entryData = new ProductEntity(productDto);
  
      return await this.entityManager.transaction(async (eManager) => {
        let imageNames: string = '', bannerName: string;
        if (productDto.images) {
          const namePromises = productDto.images.map(
            async (f: any) => await this.filesService.processFile(f),
          );
          const names = await Promise.all(namePromises);
          imageNames = names.join();
        }

        if(entryData.banner) bannerName = await this.filesService.processFile(entryData.banner);
  
        // Find the user
        const usr = await eManager.findOne(UserEntity, {
          where: {
            userId: productDto.creatorId,
          },
        });
        if (!usr) throw new HttpException('User record not found in database.', 400);
  
        // Prepare date for code generation
        const newDate = new Date();
        const year = newDate.getFullYear().toString().slice(-2);
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;
        const prodName = productDto.productName.substring(0, 3).toUpperCase();

        // Generate a unique identifier with 4 alphanumeric characters
        const uniqueIdentifier = this.generateUniqueIdentifier(4);
        const barcode = `${formattedDate}${prodName}${uniqueIdentifier}${entryData.companyId}`;
  
        const pcIdentifier = this.generateUniqueIdentifier(6);
        // Check for product code or generate one
        let productCode = productDto.productCode;
        if (!productCode) {
          productCode = `${pcIdentifier}${prodName}${entryData.companyId}`;
          // Ensure productCode is unique
          const existingProduct = await eManager.findOne(ProductEntity, {
            where: { productCode },
          });
          if (existingProduct) {
            throw new ConflictException('Generated product code already exists. Please try again.');
          }
        }
  
        const product = { ...productDto, barcode, images: imageNames, productCode , banner: bannerName };
        const productEntity = new ProductEntity(product);
        productEntity.status = true;
  
        console.log('product entity', productEntity);
  
        const productDataResult = await eManager.insert(ProductEntity, productEntity);
        if (productDataResult.identifiers[0].id === 0) throw new InternalServerErrorException();
        console.log(productDataResult);
  
        const inventoryData = await eManager.insert(InventoryEntity, {
          quantity: 0.0,
          status: true,
          createdAt: new Date(),
          productId: productDataResult.identifiers[0].id,
          userId: productDto.creatorId,
          companyId: entryData.companyId,
        });
  
        if (inventoryData.identifiers[0].id <= 0)
          throw new InternalServerErrorException('Error creating Inventory');
        else return SuccessReturn('Inventory created Successfully');
      });
    } catch (error) {
      console.log('error', error);
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
          status: true,
        },
        select: {
          id: true,
          productCode: true,
          barcode: true,
          productName: true,
          productDescription: true,
          purchasePrice: true,
          sellingPrice: true,
          offerPrice: true,
          offerFrom: true,
          offerUpto: true,
          manfDate: true,
          expiryDate: true,
          validityMonth: true,
          images: true,
          banner: true,
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
            categoryName: true,
          },
          brand: {
            brandName: true,
          },
          unit: {
            unitName: true,
          },
        },
        relations: ['category', 'brand', 'unit'],
      });
      if (productData.length > 0) return productData;
      else throw new EntityNotFoundException();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.entityManager.findOne(ProductEntity, {
        where: {
          id: id,
          status: true,
        },
        select: {
          id: true,
          productCode: true,
          barcode: true,
          productName: true,
          productDescription: true,
          purchasePrice: true,
          sellingPrice: true,
          offerPrice: true,
          offerFrom: true,
          offerUpto: true,
          manfDate: true,
          expiryDate: true,
          validityMonth: true,
          banner: true,
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
            categoryName: true,
          },
          brand: {
            brandName: true,
          },
          unit: {
            unitName: true,
          },
        },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(productDto: UpdateProductDto) {
    try {
      const user = await this.entityManager.findOne(UserEntity, {
        where: { userId: productDto.creatorId }
      });
  
      // Find the existing product
      const foundProduct = await this.entityManager.findOne(ProductEntity, {
        where: { id: productDto.id },
      });
  
      // Ideally, this error should never happen.
      if (!foundProduct) throw new HttpException('Product not found in the database.', 400);
  
      let updatedImages: string= '', updatedBannerName: string;
      // Process image updates
      if (productDto.images) {
        const tmp = await this.filesService.processMultipleFiles(productDto.images, foundProduct.images);
        updatedImages = tmp.join(',');
      } else {
        updatedImages = foundProduct.images;
      }

      //process banner image
      if(productDto.banner) {
        updatedBannerName = await this.filesService.processFile(productDto.banner);
      } else {
        updatedBannerName = foundProduct.banner;
      }
  
      // Check for product code or retain the existing one
      let productCode = productDto.productCode;
      if (!productCode) {
        productCode = foundProduct.productCode;
      } else {
        // Ensure the new product code is unique
        const existingProduct = await this.entityManager.findOne(ProductEntity, {
          where: { productCode },
        });
        if (existingProduct && existingProduct.id !== foundProduct.id) {
          throw new ConflictException('Provided product code already exists. Please try again.');
        }
      }
  
      const updatedProductData = {
        ...productDto,
        images: updatedImages,
        banner: updatedBannerName,
        productCode, // Include the product code
        updatedBy: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
      };
  
      const updatedProduct = await this.entityManager.update(ProductEntity, foundProduct.id, updatedProductData);
      
      if (!updatedProduct) throw new InternalServerErrorException('Failed to update product');
  
      return { updatedProduct };
    } catch (error) {
      throw error;
    }
  }
  

  async remove(id: number) {
    // Check inventory quantity
    const inventory = await this.entityManager.findOne(InventoryEntity, {
      where: { id:id },
    });

    if (!inventory) {
      throw new HttpException('Inventory not found in the database.', 400);
    }

    if (inventory.quantity !== 0) {
      throw new HttpException('Inventory quantity must be exactly zero to proceed.', 400);
    }

    return this.entityManager.softDelete(ProductEntity, { id: id });
  }
}
