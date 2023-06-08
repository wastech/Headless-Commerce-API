import { Model } from 'mongoose';
import { CategoryDTO, SubcategoryDTO } from './dto/create-category.dto';
import { Category, CategoryDocument, Subcategory } from './entities/category.entity';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    getAllCategories(): Promise<Category[]>;
    createCategory(categoryDto: CategoryDTO): Promise<CategoryDTO>;
    getCategoryBySlug(slug: string): Promise<Category>;
    getSubcategoriesByCategorySlugAndSubcategoryName(categorySlug: string, subcategoryName: string): Promise<Subcategory[]>;
    updateCategoryAndSubcategories(categorySlug: string, categoryDto: CategoryDTO, subcategoriesDto: SubcategoryDTO[]): Promise<CategoryDTO>;
    deleteCategory(slug: string): Promise<void>;
}
