import {Module} from '@nestjs/common';
import {FetchApiService} from './fetch-api.service';
import {ProductsModule} from "../products/products.module";
import {ReviewsModule} from "../reviews/reviews.module";
import {StarsModule} from "../stars/stars.module";

@Module({
    imports: [
        ProductsModule,
        ReviewsModule,
        StarsModule
    ],
    providers: [FetchApiService],
    exports: [FetchApiService]
})
export class FetchApiModule {
}
