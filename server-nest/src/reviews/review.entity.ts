import {Column, Entity, ObjectIdColumn} from "typeorm";

export type image = {
    _id: number;
    full_path: string;
}

@Entity({name: "reviews"})
export class Review {
    @ObjectIdColumn()
    _id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    rating: number;

    @Column()
    images: Array<image>;

    @Column()
    created_at: string;

    @Column()
    created_by: {
        _id: number;
        full_name: string;
        avatar_url: string;
    };

    @Column()
    product_id: string;
}