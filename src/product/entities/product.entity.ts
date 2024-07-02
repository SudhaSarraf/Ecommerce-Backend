import { CategoryEntity } from 'src/category/entities/category.entity';
import { Public } from './../../common/public.decorator';
import { AbstractEntity } from 'src/common/abstract.entity';
import { CompanyInfoEntity } from 'src/compnay-info/entities/compnay-info.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { UnitEntity } from 'src/unit/entities/unit.entity';

export enum ProductSection {
    mens = 'men',
    womwns = 'womens',
    kids = 'kids',
  }

@Entity({ name: 'product', schema:'Public' })
export class ProductEntity extends AbstractEntity<ProductEntity> {
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column({ unique: true, nullable: false })
    productCode: string;

    @Column({ unique: true, nullable: false })
    barcode: string;

    @Column()
    productName: string;

    // @Column()
    // brand: string;

    @Column('decimal', { precision: 10, scale: 2 })
    purchasePrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    sellingPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    offerPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false })
    offerFrom: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false })
    offerUpto: number;

    @Column({ nullable: true })
    manfDate: Date;

    @Column({ nullable: true })
    expiryDate: Date;

    @Column({ nullable: true })
    validityMonth: Date;

    @Column()
    images: string;

    @Column({
        name: 'productSection',
        type: 'enum',
        enum: ProductSection,
      })
    productSection: ProductSection;

    @Column({ type: 'int', nullable: false })
    companyId: number;

    @Column({ type: 'int', nullable: false })
    categoryId: number;

    @Column({ type: 'int', nullable: false })
    brandId: number;

    @Column({ type: 'int', nullable: false })
    unitId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    status: boolean;

    @Column({type:'varchar'})
    creatorId: string;

    @Column({ length: 50, default: "unknown" })
    createdBy: string;

    @Column({ length: 50, default: null, nullable: true })
    updatedBy: string;

    @ManyToOne(() => UserEntity, (user) => user.product, { nullable: false, eager: true, cascade: ['insert', 'update'] })
    @JoinColumn({
        referencedColumnName: 'userId',
        name: 'creatorId',
    })
    user: UserEntity;

    @ManyToOne(() => CompanyInfoEntity, company => company.products)
    @JoinColumn({name: 'companyId'})
    company: CompanyInfoEntity;

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({name: 'categoryId'})
    category: CategoryEntity;

    @ManyToOne(() => BrandEntity, brand => brand.products)
    @JoinColumn({name: 'brandId'})
    brand: BrandEntity;  
    
    @ManyToOne(() => UnitEntity, unit => unit.products)
    @JoinColumn({name: 'unitId'})
    unit: UnitEntity;  
}
