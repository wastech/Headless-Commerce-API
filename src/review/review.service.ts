import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entity';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtPayload } from '../user/interfaces/jwt-payload.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async submitReview(
    productId: string,
    rating: number,
    comment: string,
    user: JwtPayload,
  ): Promise<Product> {
    const review = new this.reviewModel({
      productId,
      rating,
      comment,
      user: user._id,
    });
    if (rating > 5) {
      throw new BadRequestException('Rating cannot exceed 5');
    }
    // Check if user has already posted a review
    const existingReview = await this.reviewModel.findOne({
      productId,
      user,
    });
    if (existingReview) {
      throw new ConflictException(
        'User has already posted a review for this product',
      );
    }
    await review.save();

    const product = await this.productModel.findByIdAndUpdate(
      productId,
      {
        $inc: { reviewCount: 1 },
        $push: { reviews: review._id },
        $set: { rating: await this.calculateOverallRating(productId) },
      },
      { new: true },
    );

    return product;
  }

  private async calculateOverallRating(productId: string): Promise<number> {
    const product = await this.productModel
      .findById(productId)
      .populate('reviews');
    if (!product || product.reviews.length === 0) {
      return 0;
    }

    const sum = product.reviews.reduce((acc, item) => item.rating + acc, 0);
    const averageRating = sum / product.reviews.length;

    const scalingFactor = 5 / averageRating; // Calculate the scaling factor
    const scaledRating = product.reviews.map(
      (item) => item.rating * scalingFactor,
    ); // Apply the scaling factor to each review rating
    const overallRating =
      scaledRating.reduce((acc, item) => item + acc, 0) / scaledRating.length;

    product.rating = overallRating;
    await product.save();

    return overallRating;
  }

  async deleteReview(reviewId: string): Promise<void> {
    const review = await this.reviewModel.findByIdAndDelete(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    const product = await this.productModel.findById(review.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Remove the review ID from the product
    product.reviews = product.reviews.filter(
      (id) => id.toString() !== reviewId,
    );

    // Recalculate the overall rating of the associated product
    const overallRating = await this.calculateOverallRatinga(product);

    if (isNaN(overallRating)) {
      throw new Error('Invalid overall rating');
    }

    product.rating = overallRating;
    await product.save();
  }

  private async calculateOverallRatinga(product: Product): Promise<number> {
    if (product.reviews.length === 0) {
      return 0;
    }

    const sum = product.reviews.reduce((acc, item) => item.rating + acc, 0);
    const averageRating = sum / product.reviews.length;

    if (!Number.isFinite(averageRating)) {
      throw new Error('Invalid overall rating');
    }

    const scalingFactor = 5 / averageRating; // Calculate the scaling factor
    const scaledRating = product.reviews.map(
      (item) => item.rating * scalingFactor,
    ); // Apply the scaling factor to each review rating
    const overallRating =
      scaledRating.reduce((acc, item) => item + acc, 0) / scaledRating.length;

    if (!Number.isFinite(overallRating)) {
      throw new Error('Invalid overall rating');
    }

    return overallRating;
  }
}
