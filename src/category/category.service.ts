import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDTO, SubcategoryDTO } from './dto/create-category.dto';
import {
  Category,
  CategoryDocument,
  Subcategory,
} from './entities/category.entity';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find().exec();
    return categories;
  }

  async createCategory(categoryDto: CategoryDTO): Promise<CategoryDTO> {
    // Generate slug from category name
    const slug = slugify(categoryDto.slug, { lower: true });

    // Check if slug already exists
    const existingCategory = await this.categoryModel.findOne({ slug });
    if (existingCategory) {
      throw new Error('Category slug already exists');
    }

    const subcategories = categoryDto.subcategories.map((subcategoryDto) => {
      const subcategory = new Subcategory();
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

  async getCategoryBySlug(slug: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ slug }).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async getSubcategoriesByCategorySlugAndSubcategoryName(
    categorySlug: string,
    subcategoryName: string,
  ): Promise<Subcategory[]> {
    const category = await this.categoryModel
      .findOne({ slug: categorySlug, 'subcategories.name': subcategoryName })
      .exec();

    if (!category) {
      throw new NotFoundException('Category or subcategory not found');
    }

    const subcategories = category.subcategories.filter(
      (subcategory) => subcategory.name === subcategoryName,
    );
    return subcategories;
  }

  async updateCategoryAndSubcategories(
    categorySlug: string,
    categoryDto: CategoryDTO,
    subcategoriesDto: SubcategoryDTO[],
  ): Promise<CategoryDTO> {
    const category = await this.categoryModel
      .findOne({ slug: categorySlug })
      .exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Update category properties
    category.name = categoryDto.name;
    category.slug = slugify(categoryDto.name, { lower: true });

    // Update subcategories
    category.subcategories = subcategoriesDto.map(
      (subcategoryDto: SubcategoryDTO) => {
        const subcategory = new Subcategory();
        subcategory.name = subcategoryDto.name;
        return subcategory;
      },
    );

    const updatedCategory = await category.save();
    return updatedCategory;
  }

  async deleteCategory(slug: string): Promise<void> {
    const deletedCategory = await this.categoryModel
      .findOneAndDelete({ slug })
      .exec();
    if (!deletedCategory) {
      throw new NotFoundException('Category not found');
    }
  }
}
