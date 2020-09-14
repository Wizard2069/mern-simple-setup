import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {FetchApiService} from "../fetch-api/fetch-api.service";
import {getMongoManager} from "typeorm";
import {Product} from "../products/product.entity";

export const categories = [
    1789, 4221, 1815, 1846, 1801,
    1882, 1883, 4384, 914, 8322, 8594
];

@Injectable()
export class TasksService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: any,
        private fetchApiService: FetchApiService
    ) {
    }

    @Cron(CronExpression.EVERY_DAY_AT_3AM, {timeZone: "Asia/Ho_Chi_Minh"})
    async handleCron(): Promise<void> {
        await this.fetchApiService.deleteAllCollections();
        await this.deleteCache();
        for (const category of categories) {
            await this.fetchApiService.addProducts(category);
        }
        await getMongoManager().createCollectionIndexes(Product, [
            {
                key: {
                    key_name: "text",
                    price: 1,
                    rating_average: 1
                }
            }
        ]);
        await this.fetchApiService.addReviews();
    }

    async deleteCache(): Promise<void> {
        await this.cacheManager.del("/products");
        await this.cacheManager.del("/categories");
        await this.cacheManager.del("/product");
    }
}
