import {IsNotEmpty} from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    list_price: number;

    @IsNotEmpty()
    rating_average: number;

    @IsNotEmpty()
    review_count: number;

    @IsNotEmpty()
    image_url: string;

    @IsNotEmpty()
    summary_description: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    link: string;
}