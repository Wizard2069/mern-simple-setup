import {ReviewTiki} from "./review-tiki.interface";

export interface ReviewsTiki {
    stars: object;
    rating_average: number;
    review_count: number;
    data: [ReviewTiki];
}