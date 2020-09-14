import {Module} from '@nestjs/common';
import {ReviewsService} from './reviews.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Review} from "./review.entity";
import {ReviewRepository} from "./review.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Review, ReviewRepository])
    ],
    providers: [ReviewsService],
    exports: [ReviewsService]
})
export class ReviewsModule {
}
