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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const public_decorator_1 = require("../user/decorators/public.decorator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(createProductDto, req) {
        return this.productService.createProduct(createProductDto, req.user);
    }
    async getMyProducts(req) {
        const userId = req.user._id;
        return this.productService.getProductsByUser(userId);
    }
    async getAllProducts(page, limit) {
        const products = await this.productService.findAll(page, limit);
        return products;
    }
    async updatePost(id, updateProductDto, req) {
        const product = await this.productService.getProductById(id);
        if (!product) {
            throw new common_1.NotFoundException(`Blog post with ID ${id} not found`);
        }
        const user = req.user;
        if (product.createdBy.toString() !== user._id.toString() &&
            user.role !== 'admin') {
            throw new common_1.UnauthorizedException(`You are not authorized to update this post`);
        }
        const updatedProduct = await this.productService.updatePost(id, updateProductDto);
        return {
            message: `Blog post with ID ${id} updated successfully`,
            post: updatedProduct,
        };
    }
    async getFilters(categorySlug, minPrice, maxPrice, brand, rating, createdBy, size, page, limit) {
        const filters = {
            price: { minPrice, maxPrice },
            brand,
            rating,
            createdBy,
            size,
        };
        const products = await this.productService.productFilter(categorySlug, filters, page, limit);
        return products;
    }
    async findSimilarBlogs(id) {
        const product = await this.productService.getProductById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const similarBlogs = await this.productService.findSimilarProducts(product);
        return similarBlogs;
    }
    getProductsByUser(userId) {
        return this.productService.getProductsByUser(userId);
    }
    async getProductByIdAndSlug(productId, productSlug) {
        const product = await this.productService.findOneByIdAndSlug(productId, productSlug);
        return product;
    }
    async deleteProduct(id) {
        try {
            await this.productService.deleteProduct(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Product not found');
            }
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('my-products'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getMyProducts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Patch)(':id/update-product'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updatePost", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':categorySlug'),
    __param(0, (0, common_1.Param)('categorySlug')),
    __param(1, (0, common_1.Query)('minPrice')),
    __param(2, (0, common_1.Query)('maxPrice')),
    __param(3, (0, common_1.Query)('brand')),
    __param(4, (0, common_1.Query)('rating')),
    __param(5, (0, common_1.Query)('createdBy')),
    __param(6, (0, common_1.Query)('size')),
    __param(7, (0, common_1.Query)('page')),
    __param(8, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, Number, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getFilters", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id/similars'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findSimilarBlogs", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductsByUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':productId/:productSlug'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('productSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductByIdAndSlug", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map