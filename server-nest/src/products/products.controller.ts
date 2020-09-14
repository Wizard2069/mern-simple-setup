import {Controller, Get, InternalServerErrorException, Param, Query, ValidationPipe} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {GetProductsFilterDto} from "./dto/get-products-filter.dto";
import {ReviewsService} from "../reviews/reviews.service";
import {StarsService} from "../stars/stars.service";

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
        private reviewsService: ReviewsService,
        private starsService: StarsService
    ) {
    }

    @Get()
    async getProducts(
        @Query(ValidationPipe) filterDto: GetProductsFilterDto,
    ): Promise<any> {
        return this.productsService.getProducts(filterDto);
    }

    @Get(":id")
    async getProduct(@Param("id") id: string) {
        const product = await this.productsService.getProduct(id);
        const reviews = await this.reviewsService.getReviews(id);
        const stars = await this.starsService.getStars(id);

        try {
            return {
                message: "Fetch product successfully",
                product: product,
                reviews: reviews,
                stars: stars
            };
        } catch (err) {
            throw new InternalServerErrorException();
        }

    }
}
