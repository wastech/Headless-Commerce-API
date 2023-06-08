import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto, req: any): Promise<Product>;
    getMyProducts(req: any): Promise<Product[]>;
    getAllProducts(page: number, limit: number): Promise<Product[]>;
    updatePost(id: string, updateProductDto: UpdateProductDto, req: any): Promise<{
        message: string;
        post: Product;
    }>;
    getFilters(categorySlug: string, minPrice?: number, maxPrice?: number, brand?: string, rating?: number, createdBy?: string, size?: string, page?: number, limit?: number): Promise<Product[]>;
    findSimilarBlogs(id: string): Promise<Product[]>;
    getProductsByUser(userId: string): Promise<Product[]>;
    getProductByIdAndSlug(productId: string, productSlug: string): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}
