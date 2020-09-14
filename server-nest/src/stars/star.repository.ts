import {EntityRepository, Repository} from "typeorm";
import {Star} from "./star.entity";
import {CreateStarDto} from "./dto/create-star.dto";

@EntityRepository(Star)
export class StarRepository extends Repository<Star> {
    async createStar(createStarDto: CreateStarDto): Promise<Star> {
        const {_id, stars, product_id} = createStarDto;

        const star = this.create({
            _id,
            stars,
            product_id
        });

        try {
            await this.save(star);
        } catch (err) {
            console.log(err);
        }

        return star;
    }
}