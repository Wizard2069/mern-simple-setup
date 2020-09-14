import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewRepository} from "./review.repository";
import {CreateReviewDto} from "./dto/create-review.dto";
import {Review} from "./review.entity";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(ReviewRepository)
        private reviewRepository: ReviewRepository
    ) {
    }

    async getReviews(id: string): Promise<Review[]> {
        return this.reviewRepository.find({product_id: id});
    }

    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewRepository.createReview(createReviewDto);
    }

    async deleteAllReviews(): Promise<void> {
        await this.reviewRepository.clear();
    }
}
