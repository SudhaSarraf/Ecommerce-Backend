import { AbstractEntity } from 'src/common/abstract.entity';
import { CompanyInfoEntity } from 'src/compnay-info/entities/compnay-info.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'inventory', schema: 'Public' })
export class InventoryEntity extends AbstractEntity<InventoryEntity> {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false })
  quantity: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  productId: number;

  @Column()
  userId: string;

  @Column()
  companyId: number;

  @OneToMany(() => ProductEntity, (product) => product.inventory)
  @JoinColumn({ name: 'productId' })
  product?: ProductEntity[];

  @OneToMany(() => UserEntity, (user) => user.inventory)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity[];

  @ManyToOne(() => CompanyInfoEntity, (company) => company.unit)
  @JoinColumn({ name: 'companyId' })
  company: CompanyInfoEntity;
}
