import { CategoryToCreateType, CategoryType } from '../../domain/entities/Category.entity';
import { CategoryService } from '../services/CategoryService';

/**
 * Use case for creating a Category
 */
export class CreateCategoryUseCase {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Execute the use case
     * @param dto Data for creating category
     */
    public async execute(dto: CategoryToCreateType): Promise<CategoryType> {
        return this.categoryService.createCategory(dto);
    }
}
