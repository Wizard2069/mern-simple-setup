import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductRepository} from "./product.repository";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./product.entity";
import {GetProductsFilterDto} from "./dto/get-products-filter.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository
    ) {
    }

    async getAllProducts() {
        return this.productRepository.find({
            select: [
                "_id",
                "category"
            ],
            where: {}
        });
    }

    async getProducts(filterDto: GetProductsFilterDto): Promise<any> {
        return this.productRepository.getProducts(filterDto);
    }

    async getProduct(id: string): Promise<Product> {
        return this.productRepository.getProduct(id);
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(createProductDto);
    }

    async deleteAllProducts(): Promise<void> {
        await this.productRepository.clear();
    }
}
