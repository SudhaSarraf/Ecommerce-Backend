// import { PrimaryColumn } from "typeorm";

export class AbstractEntity<E> {

    constructor(entity: Partial<E>) {
        Object.assign(this, entity);
    }
}