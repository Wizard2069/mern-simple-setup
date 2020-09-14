import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FetchApiModule} from "./fetch-api/fetch-api.module";
import {FetchApiService} from "./fetch-api/fetch-api.service";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import * as compression from "compression";
import {categories, TasksService} from "./tasks/tasks.service";
import {getMongoManager} from "typeorm";
import {Product} from "./products/product.entity";
import {TasksModule} from "./tasks/tasks.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(compression());
    app.use(helmet());
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));
    app.setGlobalPrefix("api/shop");
    app.enableCors({origin: process.env.CLIENT});

    await app.listen(process.env.PORT || 8080);
    console.log(`Server is running on port ${await app.getUrl()}`);

    const fetchApi = app.select(FetchApiModule).get(FetchApiService, {strict: true});
    const taskManager = app.select(TasksModule).get(TasksService, {strict: true});
    await taskManager.deleteCache();
    for (const category of categories) {
        await fetchApi.addProducts(category);
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
    await fetchApi.addReviews();
}

bootstrap();
