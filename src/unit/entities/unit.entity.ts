import { AbstractEntity } from "src/common/abstract.entity";
import { CompanyInfoEntity } from "src/compnay-info/entities/compnay-info.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'unit', schema:'Public' })
export class UnitEntity extends AbstractEntity<UnitEntity>{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    unitName: string;

    @Column({default: true})
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

    @OneToMany(() => ProductEntity, products => products.unit)
    products: ProductEntity[];

    @ManyToOne(() => UserEntity, (user) => user.unit, { nullable: false, eager: true, cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => CompanyInfoEntity, company => company.unit)
    @JoinColumn({name: 'companyId'})
    company: CompanyInfoEntity;
}
