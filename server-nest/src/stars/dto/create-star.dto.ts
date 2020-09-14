import {IsNotEmpty} from "class-validator";

export class CreateStarDto {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    stars: object;

    @IsNotEmpty()
    product_id: string;
}