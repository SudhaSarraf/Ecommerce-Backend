import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { EntityManager } from 'typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { EntityNotFoundException } from 'src/common/errors/entityNotFoundException';

@Injectable()
export class InventoryService {
  constructor(
    private readonly entityManager: EntityManager,
  ) {}
 
  async findAll(companyId: string) {
    try {
      const inventoryData = await this.entityManager.find(InventoryEntity, {
        where: {
          companyId: companyId,
          status: true,
        },
        select: {
          id: true,
          quantity: true,
          userId: true,
          companyId: true,
          createdAt: true,
          updatedAt: true,
          productId: true,
          user: {
            firstName: true,
            lastName: true,
          },
          company: {
            name: true,
          },
        },
        relations: ['user', 'product', 'company'],
        order: {
          id: 'DESC'
        },
      });
      if(inventoryData.length > 0) return inventoryData;
      else throw new EntityNotFoundException();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const inventoryData = await this.entityManager.findOne(InventoryEntity, {
        where: {
          id: id,
          status: true,
        },
        select: {
          id: true,
          quantity: true,
          userId: true,
          companyId: true,
          createdAt: true,
          updatedAt: true,
          productId: true,
          user: {
            firstName: true,
            lastName: true,
          },
          company: {
            name: true,
          },
        },
        relations: ['user', 'product', 'company'],
      })
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
