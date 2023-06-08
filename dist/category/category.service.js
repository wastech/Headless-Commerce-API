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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_entity_1 = require("./entities/category.entity");
const slugify_1 = require("slugify");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async getAllCategories() {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }
    async createCategory(categoryDto) {
        const slug = (0, slugify_1.default)(categoryDto.slug, { lower: true });
        const existingCategory = await this.categoryModel.findOne({ slug });
        if (existingCategory) {
            throw new Error('Category slug already exists');
        }
        const subcategories = categoryDto.subcategories.map((subcategoryDto) => {
            const subcategory = new category_entity_1.Subcategory();
            subcategory.name = subcategoryDto.name;
            return subcategory;
        });
        const category = new this.categoryModel({
            name: categoryDto.name,
            slug,
            subcategories,
        });
        console.log('object', category);
        const createdCategory = await category.save();
        return createdCategory;
    }
    async getCategoryBySlug(slug) {
        const category = await this.categoryModel.findOne({ slug }).exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async getSubcategoriesByCategorySlugAndSubcategoryName(categorySlug, subcategoryName) {
        const category = await this.categoryModel
            .findOne({ slug: categorySlug, 'subcategories.name': subcategoryName })
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category or subcategory not found');
        }
        const subcategories = category.subcategories.filter((subcategory) => subcategory.name === subcategoryName);
        return subcategories;
    }
    async updateCategoryAndSubcategories(categorySlug, categoryDto, subcategoriesDto) {
        const category = await this.categoryModel
            .findOne({ slug: categorySlug })
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        category.name = categoryDto.name;
        category.slug = (0, slugify_1.default)(categoryDto.name, { lower: true });
        category.subcategories = subcategoriesDto.map((subcategoryDto) => {
            const subcategory = new category_entity_1.Subcategory();
            subcategory.name = subcategoryDto.name;
            return subcategory;
        });
        const updatedCategory = await category.save();
        return updatedCategory;
    }
    async deleteCategory(slug) {
        const deletedCategory = await this.categoryModel
            .findOneAndDelete({ slug })
            .exec();
        if (!deletedCategory) {
            throw new common_1.NotFoundException('Category not found');
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map