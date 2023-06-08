import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    submitReview(productId: string, rating: number, comment: string, req: any): Promise<{
        message: string;
        product: import("../product/entities/product.entity").Product;
    }>;
    deleteReview(id: string): Promise<void>;
}
