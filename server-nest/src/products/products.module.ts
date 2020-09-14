import {Module} from '@nestjs/common';
import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {ProductRepository} from "./product.repository";
import {ReviewsModule} from "../reviews/reviews.module";
import {StarsModule} from "../stars/stars.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductRepository]),
        ReviewsModule,
        StarsModule
    ],
    controllers: [
        ProductsController
    ],
    providers: [ProductsService],
    exports: [
        ProductsService
    ]
})
export class ProductsModule {
}
