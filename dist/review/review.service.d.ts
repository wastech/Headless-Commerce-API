import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entity';
import { Review } from './entities/review.entity';
import { JwtPayload } from '../user/interfaces/jwt-payload.interface';
export declare class ReviewService {
    private readonly productModel;
    private readonly reviewModel;
    constructor(productModel: Model<Product>, reviewModel: Model<Review>);
    submitReview(productId: string, rating: number, comment: string, user: JwtPayload): Promise<Product>;
    private calculateOverallRating;
    deleteReview(reviewId: string): Promise<void>;
    private calculateOverallRatinga;
}
