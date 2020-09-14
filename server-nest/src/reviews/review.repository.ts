import {EntityRepository, Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        const {_id, title, content, images, rating, created_at, created_by, product_id} = createReviewDto;

        const review = this.create({
            _id,
            title,
            content,
            images,
            rating,
            created_at,
            created_by,
            product_id
        });

        try {
            await this.save(review);
        } catch (err) {
            console.log(err);
        }

        return review;
    }
}