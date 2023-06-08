import { CategoryService } from './category.service';
import { CategoryDTO, SubcategoryDTO } from './dto/create-category.dto';
import { Category, Subcategory } from './entities/category.entity';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(): Promise<Category[]>;
    createCategory(categoryDto: CategoryDTO): Promise<CategoryDTO>;
    getCategoryBySlug(slug: string): Promise<Category>;
    getSubcategoriesByCategorySlugAndSubcategoryName(categorySlug: string, subcategoryName: string): Promise<Subcategory[]>;
    updateCategoryAndSubcategories(slug: string, categoryDto: CategoryDTO, subcategoriesDto: SubcategoryDTO[]): Promise<CategoryDTO>;
    deleteCategory(slug: string): Promise<void>;
}
