import {Module} from '@nestjs/common';
import {StarsService} from './stars.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Star} from "./star.entity";
import {StarRepository} from "./star.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Star, StarRepository])
    ],
    providers: [StarsService],
    exports: [StarsService]
})
export class StarsModule {
}
