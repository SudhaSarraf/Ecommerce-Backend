import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePreOrderDto, UpdatePreOrderDto } from './dto/pre-order.dto';
import { EntityManager } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/users.service';
import { PreOrderEntity } from './entities/pre-order.entity';

@Injectable()
export class PreOrderService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(createPreOrderDto: CreatePreOrderDto, userId: string): Promise<PreOrderEntity> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productService.findOne(createPreOrderDto.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const preOrder = this.entityManager.create(PreOrderEntity, {
      ...createPreOrderDto,
      user,
      product,
    });

    return this.entityManager.save(preOrder);
  }

  findAll() {
    return `This action returns all preOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preOrder`;
  }

  update(id: number, updatePreOrderDto: UpdatePreOrderDto) {
    return `This action updates a #${id} preOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} preOrder`;
  }
}
