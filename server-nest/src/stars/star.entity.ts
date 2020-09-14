import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity("stars")
export class Star {
    @ObjectIdColumn()
    _id: string;

    @Column()
    stars: object;

    @Column()
    product_id: string;
}