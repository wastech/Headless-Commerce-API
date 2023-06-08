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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_entity_1 = require("./entities/product.entity");
const category_entity_1 = require("../category/entities/category.entity");
const review_entity_1 = require("../review/entities/review.entity");
const slugify_1 = require("slugify");
let ProductService = class ProductService {
    constructor(productModel, categoryModel, reviewModel) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.reviewModel = reviewModel;
    }
    async createProduct(createProductDto, user) {
        const createdProduct = new this.productModel(Object.assign(Object.assign({}, createProductDto), { createdBy: user._id }));
        return createdProduct.save();
    }
    async findAll(page, limit) {
        const startIndex = (page - 1) * limit;
        const products = await this.productModel
            .find()
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit)
            .exec();
        return products;
    }
    async productFilter(categorySlug, filters, page, limit) {
        const category = await this.categoryModel
            .findOne({ slug: categorySlug })
            .exec();
        if (!category) {
            throw new Error('Category not found');
        }
        const query = {
            category: category._id,
        };
        if (filters.price && filters.price.minPrice && filters.price.maxPrice) {
            query['price'] = {
                $gte: filters.price.minPrice,
                $lte: filters.price.maxPrice,
            };
        }
        if (filters.brand) {
            query['brand'] = filters.brand;
        }
        if (filters.rating) {
            query['rating'] = filters.rating;
        }
        if (filters.createdBy) {
            query['createdBy'] = filters.createdBy;
        }
        if (filters.size) {
            query['size'] = filters.size;
        }
        const startIndex = (page - 1) * limit;
        const products = await this.productModel
            .find(query)
            .skip(startIndex)
            .limit(limit)
            .populate('category', 'name')
            .populate('createdBy', 'name')
            .exec();
        return products;
    }
    async getProductById(productId) {
        const product = await this.productModel.findById(productId).exec();
        return product;
    }
    async findOneByIdAndSlug(productId, productSlug) {
        const product = await this.productModel
            .findOne({
            $and: [{ _id: productId }, { slug: productSlug }],
        })
            .populate('category', 'name')
            .populate('createdBy', 'name')
            .populate('reviews')
            .exec();
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async findSimilarProducts(product) {
        const similarBlogs = await this.productModel
            .find({
            category: product.category,
            _id: { $ne: product._id },
        })
            .sort({ createdAt: -1 })
            .limit(3)
            .exec();
        return similarBlogs;
    }
    async updatePost(id, updateProductDto) {
        const options = { new: true };
        if (updateProductDto.title) {
            updateProductDto.slug = (0, slugify_1.default)(updateProductDto.title, { lower: true });
        }
        return this.productModel
            .findByIdAndUpdate(id, updateProductDto, options)
            .exec();
    }
    async deleteProduct(productId) {
        const product = await this.productModel.findByIdAndDelete(productId);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        await this.reviewModel.deleteMany({ productId });
    }
    async getProductsByUser(userId) {
        return this.productModel.find({ createdBy: userId }).exec();
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __param(2, (0, mongoose_1.InjectModel)(review_entity_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map