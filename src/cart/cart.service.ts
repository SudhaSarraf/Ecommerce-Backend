import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto} from './dto/cart.dto';
import { EntityManager } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { EntityNotFoundException } from 'src/common/errors/entityNotFoundException';
import { InventoryEntity } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class CartService {
  constructor(private readonly entityManager: EntityManager) {}


  async create(createCartDto: CreateCartDto) {
    try {
      return await this.entityManager.transaction(async (eManager) => {
        // Check if the user exists
        const user = await eManager.findOne(UserEntity, {
          where: { userId: createCartDto.userId },
        });
        if (!user) throw new HttpException('User record not found in the database.', 400);

        // Initialize an array to hold cart items
        const cartItems: CartEntity[] = [];

        // Process each product in the cart
        for (const productDto of createCartDto.products) {
          // Check if the product exists
          const product = await eManager.findOne(ProductEntity, {
            where: { id: productDto.productId },
          });
          if (!product) throw new HttpException(`Product with id ${productDto.productId} not found in the database`, 400);

          // Check the inventory for the product quantity
          const inventory = await eManager.findOne(InventoryEntity, {
            where: { productId: productDto.productId },
          });
          if (!inventory) throw new HttpException(`Inventory record for product with id ${productDto.productId} not found in the database`, 400);
          if (inventory.quantity < productDto.quantity) {
            throw new HttpException(`Insufficient quantity for product with id ${productDto.productId} in the inventory`, 400);
          }

          // Create and add the cart entity to the list
          const cartEntity = new CartEntity(createCartDto);
          cartEntity.quantity = productDto.quantity;
          cartEntity.companyId = createCartDto.companyId;
          cartEntity.userId = createCartDto.userId;
          cartEntity.productId = productDto.productId;
          cartItems.push(cartEntity);
        }

        // Save all cart items
        const result = await eManager.save(cartItems);

        // Return only relevant fields for each cart item
        return result.map(cartItem => ({
          id: cartItem.id,
          userId: cartItem.userId,
          companyId: cartItem.companyId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          createdAt: cartItem.createdAt,
          updatedAt: cartItem.updatedAt,
        }));
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    let cartData = await this.entityManager.find(CartEntity,{
      where: {
        userId: userId
      },
      select: {
        id: true,
        quantity: true,
        companyId: true,
        userId: true,
        productId: true,
        createdAt: true,
        updatedAt: true,
        product: {
          productName: true,
          sellingPrice: true,
          offerPrice: true,
        },
        user: {
          firstName: true,
          lastName: true,
        }
      },
      relations: ['user','product']
    });
    if(cartData.length > 0) return cartData;
    else throw new EntityNotFoundException();
  }

  async findOne(id: number) {
    const cartData = await this.entityManager.findOne(CartEntity, {
      where: {
        id: id
      },
      select: {
        id: true,
        quantity: true,
        companyId: true,
        userId: true,
        productId: true,
        createdAt: true,
        updatedAt: true,
        product: {
          productName: true,
          sellingPrice: true,
          offerPrice: true,
        },
        user: {
          firstName: true,
          lastName: true,
        }
      },
      relations: ['user','product'],
    });
    if(!cartData) throw new NotFoundException('Cart data not found.');
    return cartData;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
