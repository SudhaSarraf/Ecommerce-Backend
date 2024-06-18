
import { AbstractEntity } from "src/common/abstract.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'role'})
export class RoleEntity extends AbstractEntity<RoleEntity>{
    @PrimaryColumn()
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(()=>UserEntity, user=> user.roles)
    users:UserEntity[]
}
