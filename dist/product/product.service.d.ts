import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { JwtPayload } from '../user/interfaces/jwt-payload.interface';
import { Category } from '../category/entities/category.entity';
import { Review } from 'src/review/entities/review.entity';
export declare class ProductService {
    private readonly productModel;
    private readonly categoryModel;
    private readonly reviewModel;
    constructor(productModel: Model<Product>, categoryModel: Model<Category>, reviewModel: Model<Review>);
    createProduct(createProductDto: CreateProductDto, user: JwtPayload): Promise<Product>;
    findAll(page: number, limit: number): Promise<Product[]>;
    productFilter(categorySlug: string, filters: {
        price?: {
            minPrice: number;
            maxPrice: number;
        };
        brand?: string;
        rating?: number;
        createdBy?: string;
        size?: string;
    }, page: number, limit: number): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    findOneByIdAndSlug(productId: string, productSlug: string): Promise<Product>;
    findSimilarProducts(product: Product): Promise<Product[]>;
    updatePost(id: string, updateProductDto: Partial<UpdateProductDto>): Promise<Product>;
    deleteProduct(productId: string): Promise<void>;
    getProductsByUser(userId: string): Promise<Product[]>;
}
