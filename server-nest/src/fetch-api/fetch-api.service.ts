import {Injectable} from '@nestjs/common';
import * as bent from "bent";
import {ProductsTiki} from "./interfaces/products-tiki.interface";
import * as sanitizeHtml from "sanitize-html";
import {ProductTiki} from "./interfaces/product-tiki.interface";
import {ProductsService} from "../products/products.service";
import {Product} from "../products/product.entity";
import {ReviewTiki} from "./interfaces/review-tiki.interface";
import {ReviewsService} from "../reviews/reviews.service";
import {CreateReviewDto} from "../reviews/dto/create-review.dto";
import {CreateProductDto} from "../products/dto/create-product.dto";
import {CreateStarDto} from "../stars/dto/create-star.dto";
import {StarsService} from "../stars/stars.service";
import {Review} from "../reviews/review.entity";
import {Star} from "../stars/star.entity";
import {ReviewsTiki} from "./interfaces/reviews-tiki.interface";

@Injectable()
export class FetchApiService {
    private getJSON: Function = bent("json");
    private cleanOptions = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "span", "img"]),
        allowedAttributes: {
            "img": ["style", "src", "alt", "width", "height"],
            "iframe": ["src", "width", "height"]
        },
        allowedStyles: {
            "img": {
                "max-width": [/^\d+(?:px|%)$/]
            }
        }
    };

    constructor(
        private productsService: ProductsService,
        private reviewsService: ReviewsService,
        private starsService: StarsService
    ) {
    }

    async addProducts(category: number): Promise<void> {
        let categoryDesc: string = null;
        const obj = await this.getJSON(`https://tiki.vn/api/v2/products?category=${category}&limit=30&sort=top_seller`) as ProductsTiki;
        obj.filters.forEach(filter => {
            if (filter.query_name === "category") {
                filter.values.forEach(value => {
                    if (value.query_value === category) {
                        categoryDesc = value.display_value;
                    }
                })
            }
        });

        for (const d of obj.data) {
            await this.addProduct(d.id, categoryDesc);
        }
    }

    async addReviews(): Promise<void> {
        const products = await this.productsService.getAllProducts();
        let stars: object = {};

        for (const prod of products) {
            const obj = await this.getJSON(`https://tiki.vn/api/v2/reviews?product_id=${Number(prod._id)}&limit=10&sort=score|desc`) as ReviewsTiki;
            for (const d of obj.data) {
                await this.addReview(d, Number(prod._id));
                stars = obj.stars;
            }
            await this.addStar(stars, Number(prod._id));
        }
    }

    async addProduct(id: number, category: string): Promise<Product> {
        const prodObj = await this.getJSON(`https://tiki.vn/api/v2/products/${id}`) as ProductTiki;
        const image_url = prodObj.thumbnail_url.replace("/cache/280x280/", "/");
        const prodLink = `https://tiki.vn/${prodObj.url_path}`;
        const prodReplaced = prodObj.description.replace("<p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Tuy nhiên tuỳ vào từng loại sản phẩm hoặc phương thức, địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, ...</p>", "");
        const prodSanitized = sanitizeHtml(prodReplaced, this.cleanOptions);
        const prodDesc = prodSanitized.split("<span></span>");

        const product: CreateProductDto = {
            _id: id.toString(),
            name: prodObj.name,
            price: prodObj.price,
            list_price: prodObj.list_price,
            rating_average: prodObj.rating_average,
            review_count: prodObj.review_count,
            image_url: image_url,
            summary_description: prodDesc.length > 1 ? prodDesc[0] : null,
            description: prodDesc.length > 1 ? prodDesc[1] : prodDesc[0],
            category: category,
            link: prodLink
        };

        return this.productsService.createProduct(product);
    }

    async addReview(rev: ReviewTiki, prodId: number): Promise<Review> {
        let avatar: string;
        if (rev.created_by.avatar_url.startsWith("//")) {
            avatar = `https://ui-avatars.com/api/?rounded=true&name=${rev.created_by.name}&background=d3d2d3&color=fff&format=svg`;
        } else {
            avatar = rev.created_by.avatar_url;
        }

        const images = rev.images.map(image => {
            return {
                _id: image.id,
                full_path: image.full_path
            };
        });

        const review: CreateReviewDto = {
            _id: rev.id.toString(),
            title: rev.title,
            content: rev.content,
            rating: rev.rating,
            images: images,
            created_at: new Date(rev.created_at * 1000).toLocaleString(),
            created_by: {
                _id: rev.created_by.id,
                full_name: rev.created_by.name,
                avatar_url: avatar
            },
            product_id: prodId.toString()
        };

        return this.reviewsService.createReview(review);
    }

    async addStar(stars: object, prodId: number): Promise<Star> {
        const star: CreateStarDto = {
            _id: `s${prodId.toString()}`,
            stars: stars,
            product_id: prodId.toString()
        };

        return this.starsService.createStar(star);
    }

    async deleteAllCollections(): Promise<void> {
        await this.productsService.deleteAllProducts();
        await this.reviewsService.deleteAllReviews();
        await this.starsService.deleteAllStars();
    }
}
