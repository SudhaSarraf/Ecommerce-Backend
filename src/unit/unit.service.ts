import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { EntityManager } from 'typeorm';
import { UnitEntity } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createunitDto: CreateUnitDto) {
    const unitEntity = new UnitEntity(createunitDto);
    const result = await this.entityManager.save(UnitEntity, unitEntity);
    return result;
  }

  async findAll() {
    return await this.entityManager.find(UnitEntity);
  }

  async findOne(id: number) {
    const result = await this.entityManager.findOne(UnitEntity, {
      where: {
        id: id
      },
    });
    if(!result) throw new NotFoundException("No record found for requested unit");
    return result;
  }

  async update(id: number, updateunitDto: UpdateUnitDto) {
    const existingUnit = await this.findOne(id);
    if(!existingUnit) throw new NotFoundException(`Brand ${existingUnit} does not exist in database`);
    return await this.entityManager.update(UnitEntity, {id: id}, {...existingUnit, ...updateunitDto});
  }

  async remove(id: number) {
    return await this.entityManager.softDelete(UnitEntity, {id:id});
  }
}