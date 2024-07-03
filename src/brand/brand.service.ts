import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { BrandEntity } from './entities/brand.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createBrandDto: CreateBrandDto) {
    const brandEntity = new BrandEntity(createBrandDto);
    const result = await this.entityManager.save(BrandEntity, brandEntity);
    return result;
  }

  async findAll() {
    return await this.entityManager.find(BrandEntity);
  }

  async findOne(id: number) {
    const result = await this.entityManager.findOne(BrandEntity, {
      where: {
        id: id,
      },
    });
    if (!result)
      throw new NotFoundException('No record found for requested brand');
    return result;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const existingBrand = await this.findOne(id);
    if (!existingBrand)
      throw new NotFoundException(
        `Brand ${existingBrand} does not exist in database`,
      );
    return await this.entityManager.update(
      BrandEntity,
      { id: id },
      { ...existingBrand, ...updateBrandDto },
    );
  }

  async remove(id: number) {
    return await this.entityManager.softDelete(BrandEntity, { id: id });
  }
}
