import { AbstractEntity } from "src/common/abstract.entity";
import { CompanyInfoEntity } from "src/compnay-info/entities/compnay-info.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'category', schema:'Public' })
export class CategoryEntity extends AbstractEntity<CategoryEntity>{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    categoryName: string;

    @Column()
    status: boolean;

    @Column()
    operatedBy?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column()
    userId: string;

    @Column()
    companyId: string;

    @OneToMany(() => ProductEntity, products => products.category)
    products: ProductEntity[];

    @ManyToOne(() => UserEntity, (user) => user.category, { nullable: false, eager: true, cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => CompanyInfoEntity, company => company.category)
    @JoinColumn({name: 'companyId'})
    company: CompanyInfoEntity;
}
