declare class ReviewDto {
    user: string;
    comment: string;
    rating: number;
}
export declare class CreateProductDto {
    category: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    numReviews: number;
    inStock: boolean;
    image: string;
    readonly createdBy: string;
    reviews: ReviewDto[];
    rating: number;
}
export {};
