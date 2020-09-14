import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {StarRepository} from "./star.repository";
import {CreateStarDto} from "./dto/create-star.dto";
import {Star} from "./star.entity";

@Injectable()
export class StarsService {
    constructor(
        @InjectRepository(StarRepository)
        private starRepository: StarRepository
    ) {
    }

    async getStars(id: string): Promise<Star[]> {
        return this.starRepository.find({product_id: id});
    }

    async createStar(createStarDto: CreateStarDto): Promise<Star> {
        return this.starRepository.createStar(createStarDto);
    }

    async deleteAllStars(): Promise<void> {
        await this.starRepository.clear();
    }
}
