import {CacheInterceptor, CacheModule, Module} from '@nestjs/common';
import {ScheduleModule} from "@nestjs/schedule";
import {TasksModule} from './tasks/tasks.module';
import {ProductsModule} from './products/products.module';
import {ReviewsModule} from './reviews/reviews.module';
import {StarsModule} from './stars/stars.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriesModule} from './categories/categories.module';
import {FetchApiModule} from './fetch-api/fetch-api.module';
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: "./.env"
        }),
        TypeOrmModule.forRoot({
            type: "mongodb",
            url: process.env.MONGO_URI,
            useUnifiedTopology: true,
            synchronize: false,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            dropSchema: process.env.NODE_ENV !== "production",
            cache: {
                duration: 60000
            }
        }),
        TasksModule,
        ProductsModule,
        ReviewsModule,
        StarsModule,
        CategoriesModule,
        FetchApiModule,
        CacheModule.register({
            ttl: 1800,
            max: 100
        })
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor
        }
    ]
})
export class AppModule {
}
