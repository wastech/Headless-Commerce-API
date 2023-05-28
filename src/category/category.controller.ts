import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO, SubcategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from '../user/decorators/public.decorator';
import { Category, Subcategory } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return categories;
  }

  @Public()
  @Post()
  async createCategory(@Body() categoryDto: CategoryDTO): Promise<CategoryDTO> {
    try {
      const createdCategory = await this.categoryService.createCategory(
        categoryDto,
      );
      return createdCategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Public()
  @Get(':slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    try {
      const category = await this.categoryService.getCategoryBySlug(slug);
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Public()
  @Get(':categorySlug/subcategories/:subcategoryName')
  async getSubcategoriesByCategorySlugAndSubcategoryName(
    @Param('categorySlug') categorySlug: string,
    @Param('subcategoryName') subcategoryName: string,
  ) {
    try {
      const subcategories =
        await this.categoryService.getSubcategoriesByCategorySlugAndSubcategoryName(
          categorySlug,
          subcategoryName,
        );
      return subcategories;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Public()
  @Put(':slug')
  async updateCategoryAndSubcategories(
    @Param('slug') slug: string,
    @Body() categoryDto: CategoryDTO,
    @Body() subcategoriesDto: SubcategoryDTO[],
  ) {
    try {
      const updatedCategory =
        await this.categoryService.updateCategoryAndSubcategories(
          slug,
          categoryDto,
          subcategoriesDto,
        );
      return updatedCategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Public()
  @Delete(':slug')
  async deleteCategory(@Param('slug') slug: string): Promise<void> {
    try {
      await this.categoryService.deleteCategory(slug);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
