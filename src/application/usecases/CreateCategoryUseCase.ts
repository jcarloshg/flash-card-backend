import { CategoryService } from '../services/CategoryService';
import { CreateCategoryDTO, CategoryResponseDTO } from '../dtos/Category.dto';

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
    public async execute(dto: CreateCategoryDTO): Promise<CategoryResponseDTO> {
        return this.categoryService.createCategory(dto);
    }
}
