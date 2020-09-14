import {IsArray, IsNotEmpty} from "class-validator";
import {image} from "../review.entity";

export class CreateReviewDto {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    rating: number;

    @IsArray()
    images: Array<image>;

    @IsNotEmpty()
    created_at: string;

    @IsNotEmpty()
    created_by: {
        _id: number;
        full_name: string;
        avatar_url: string;
    };

    @IsNotEmpty()
    product_id: string;
}