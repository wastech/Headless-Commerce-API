"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_entity_1 = require("../product/entities/product.entity");
const review_entity_1 = require("./entities/review.entity");
let ReviewService = class ReviewService {
    constructor(productModel, reviewModel) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
    }
    async submitReview(productId, rating, comment, user) {
        const review = new this.reviewModel({
            productId,
            rating,
            comment,
            user: user._id,
        });
        if (rating > 5) {
            throw new common_1.BadRequestException('Rating cannot exceed 5');
        }
        const existingReview = await this.reviewModel.findOne({
            productId,
            user,
        });
        if (existingReview) {
            throw new common_1.ConflictException('User has already posted a review for this product');
        }
        await review.save();
        const product = await this.productModel.findByIdAndUpdate(productId, {
            $inc: { reviewCount: 1 },
            $push: { reviews: review._id },
            $set: { rating: await this.calculateOverallRating(productId) },
        }, { new: true });
        return product;
    }
    async calculateOverallRating(productId) {
        const product = await this.productModel
            .findById(productId)
            .populate('reviews');
        if (!product || product.reviews.length === 0) {
            return 0;
        }
        const sum = product.reviews.reduce((acc, item) => item.rating + acc, 0);
        const averageRating = sum / product.reviews.length;
        const scalingFactor = 5 / averageRating;
        const scaledRating = product.reviews.map((item) => item.rating * scalingFactor);
        const overallRating = scaledRating.reduce((acc, item) => item + acc, 0) / scaledRating.length;
        product.rating = overallRating;
        await product.save();
        return overallRating;
    }
    async deleteReview(reviewId) {
        const review = await this.reviewModel.findByIdAndDelete(reviewId);
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        const product = await this.productModel.findById(review.productId);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        product.reviews = product.reviews.filter((id) => id.toString() !== reviewId);
        const overallRating = await this.calculateOverallRatinga(product);
        if (isNaN(overallRating)) {
            throw new Error('Invalid overall rating');
        }
        product.rating = overallRating;
        await product.save();
    }
    async calculateOverallRatinga(product) {
        if (product.reviews.length === 0) {
            return 0;
        }
        const sum = product.reviews.reduce((acc, item) => item.rating + acc, 0);
        const averageRating = sum / product.reviews.length;
        if (!Number.isFinite(averageRating)) {
            throw new Error('Invalid overall rating');
        }
        const scalingFactor = 5 / averageRating;
        const scaledRating = product.reviews.map((item) => item.rating * scalingFactor);
        const overallRating = scaledRating.reduce((acc, item) => item + acc, 0) / scaledRating.length;
        if (!Number.isFinite(overallRating)) {
            throw new Error('Invalid overall rating');
        }
        return overallRating;
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(review_entity_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map